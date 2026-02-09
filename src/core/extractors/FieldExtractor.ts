// ===========================
// FIELD EXTRACTION UTILITIES
// ===========================

class FieldExtractor {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  /**
   * Clean extracted value by removing PDF annotations and extra whitespace
   */
  private cleanValue(value: string): string {
    return value
      .replace(/\).*?>/g, "")
      .replace(/\/Type\/Annot/gi, "")
      .replace(/\/TU\([^)]*\)/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Extract a simple field using multiple patterns
   */
  private extractSimpleField(patterns: RegExp[]): string | undefined {
    for (const pattern of patterns) {
      const match = this.text.match(pattern);
      if (match) {
        const value = this.cleanValue(match[1]);
        if (value && value.length > 0) {
          return value;
        }
      }
    }
    return undefined;
  }

  /**
   * Extract multi-line field (like description or remarks)
   */
  private extractMultiLineField(
    startPatterns: RegExp[],
    stopPatterns: string[] = [],
  ): string | undefined {
    for (const pattern of startPatterns) {
      const match = this.text.match(pattern);
      if (match) {
        let value = match[1].trim();

        // Clean the value
        value = value
          .replace(/\).*?>/g, "")
          .replace(/\/Type\/Annot/gi, "")
          .replace(/\/TU\([^)]*\)/g, "")
          .replace(/ACORD 101.*?required\)/gi, "")
          .replace(/Additional Remarks Schedule.*?required/gi, "")
          .replace(/may be attached if more space is required/gi, "")
          .replace(/\s+/g, " ")
          .trim();

        // Check if value is meaningful
        if (value && value.length > 5) {
          // Check if it starts with a field label (indicates empty field)
          const fieldLabelPattern =
            /^(DESCRIPTION|LOSS|VEHICLE|INSURED|VEH\s+#|OWNER|DRIVER|REMARKS|OTHER|INJURED|WITNESSES)/i;
          if (fieldLabelPattern.test(value)) {
            return undefined;
          }

          // Check against stop patterns
          for (const stopPattern of stopPatterns) {
            if (value.toLowerCase().startsWith(stopPattern.toLowerCase())) {
              return undefined;
            }
          }

          return value;
        }
      }
    }
    return undefined;
  }

  /**
   * Extract policy number
   */
  extractPolicyNumber(): string | undefined {
    return this.extractSimpleField([
      /\/V\((\d+)\)>>?\s*policyholder/i,
      /POLICY NUMBER:?\s*([A-Z0-9-]+)/i,
    ]);
  }

  /**
   * Extract policyholder name
   */
  extractPolicyholderName(): string | undefined {
    const value = this.extractSimpleField([
      /\/V\(([^)]+)\)>>?\s*carrier/i,
      /NAME OF INSURED[^V]*\/V\(([^)]+)\)/i,
      /NAME OF INSURED:?\s*([^\n]+)/i,
    ]);

    if (value) {
      const cleaned = value.replace(/First[,\s]*Middle[,\s]*Last/i, "").trim();
      return cleaned.length > 2 ? cleaned : undefined;
    }
    return undefined;
  }

  /**
   * Extract carrier
   */
  extractCarrier(): string | undefined {
    const value = this.extractSimpleField([
      /\/V\(([^)]+)\)>>?\s*naic/i,
      /CARRIER:?\s*([^\n]+?)(?=\s*NAIC|$)/i,
    ]);
    return value && value.length > 2 ? value : undefined;
  }

  /**
   * Extract NAIC code
   */
  extractNaicCode(): string | undefined {
    const value = this.extractSimpleField([
      /NAIC CODE[^V]*\/V\(([^)]+)\)/i,
      /NAIC CODE:?\s*([^\n]+)/i,
    ]);
    return value && value.length > 1 ? value : undefined;
  }

  /**
   * Extract dates
   */
  extractDate(fieldName: string): string | undefined {
    const patterns = [
      new RegExp(`${fieldName}[^V]*\\/V\\(([^)]+)\\)`, "i"),
      new RegExp(`${fieldName}:?\\s*([^\\n]+)`, "i"),
    ];

    const value = this.extractSimpleField(patterns);
    return value && value.length > 3 ? value : undefined;
  }

  /**
   * Extract line of business
   */
  extractLineOfBusiness(): string | undefined {
    const value = this.extractSimpleField([
      /LINE OF BUSINESS[^V]*\/V\(([^)]+)\)/i,
      /LINE OF BUSINESS:?\s*([^\n]+)/i,
    ]);
    return value && value.length > 2 ? value : undefined;
  }

  /**
   * Extract incident date
   */
  extractIncidentDate(): string | undefined {
    const value = this.extractSimpleField([
      /DATE OF LOSS[^V]*\/V\(([^)]+)\)/i,
      /DATE OF LOSS(?:\s+AND\s+TIME)?:?\s*([^\n]+?)(?:\s+TIME:|$)/i,
    ]);

    if (value) {
      const cleaned = value.replace(/TIME.*$/i, "").trim();
      return cleaned.length > 3 ? cleaned : undefined;
    }
    return undefined;
  }

  /**
   * Extract incident time
   */
  extractIncidentTime(): string | undefined {
    let value = this.extractSimpleField([
      /TIME[^V]*\/V\(([^)]+)\)/i,
      /TIME:?\s*([^\n]+?)(?:\s+(?:AM|PM))?/i,
    ]);

    if (value) {
      const ampmMatch = this.text.match(
        new RegExp(value.replace(/[()]/g, "\\$&") + "\\s*(AM|PM)", "i"),
      );
      if (ampmMatch) {
        value += " " + ampmMatch[1];
      }
      return value.length > 1 ? value : undefined;
    }
    return undefined;
  }

  /**
   * Extract location
   */
  extractLocation(): string | undefined {
    const locationParts: string[] = [];

    // Extract street
    const street = this.extractSimpleField([
      /STREET[^V]*\/V\(([^)]+)\)/i,
      /STREET:?\s*([^\n]+)/i,
    ]);

    if (street) {
      const cleaned = street.replace(/LOCATION OF LOSS/gi, "").trim();
      if (cleaned.length > 2) {
        locationParts.push(cleaned);
      }
    }

    // Extract city/state/zip
    const city = this.extractSimpleField([
      /(?:CITY|STATE|ZIP)[^V]*\/V\(([^)]+)\)/i,
      /CITY,?\s*STATE,?\s*ZIP:?\s*([^\n]+)/i,
    ]);

    if (city && city.length > 2) {
      locationParts.push(city);
    }

    return locationParts.length > 0 ? locationParts.join(", ") : undefined;
  }

  /**
   * Extract country
   */
  extractCountry(): string | undefined {
    const value = this.extractSimpleField([
      /COUNTRY[^V]*\/V\(([^)]+)\)/i,
      /COUNTRY:?\s*([^\n]+)/i,
    ]);
    return value && value.length > 1 ? value : undefined;
  }

  /**
   * Extract police contacted
   */
  extractPoliceContacted(): string | undefined {
    const value = this.extractSimpleField([
      /POLICE OR FIRE DEPARTMENT CONTACTED[^V]*\/V\(([^)]+)\)/i,
      /POLICE OR FIRE DEPARTMENT CONTACTED:?\s*([^\n]+)/i,
    ]);
    return value && value.length > 1 ? value : undefined;
  }

  /**
   * Extract report number
   */
  extractReportNumber(): string | undefined {
    const value = this.extractSimpleField([
      /REPORT NUMBER[^V]*\/V\(([^)]+)\)/i,
      /REPORT NUMBER:?\s*([^\n]+)/i,
    ]);
    return value && value.length > 1 ? value : undefined;
  }
  /**
   * Extract description of accident
   */
  // ! description from simple text is not recognized
  // extractDescription(): string | undefined {
  //   return this.extractMultiLineField(
  //     [
  //       /DESCRIPTION OF ACCIDENT\s*\(ACORD 101, Additional Remarks Schedule, may be attached if more space is required\)\s*([\s\S]*?)(?=\n[A-Z][A-Z\s]+:|\nVEH\s*#|\nINSURED|\nLOSS|\nOWNER|\nDRIVER|$)/i,
  //     ],
  //     [],
  //   );
  // }
  // * description from PDF is not recognized
  // extractDescription(): string | undefined {
  //   return this.extractMultiLineField(
  //     [
  //       // 1️⃣ ACORD PDF version
  //       /DESCRIPTION OF ACCIDENT\s*\(ACORD 101, Additional Remarks Schedule, may be attached if more space is required\)\s*([\s\S]*?)(?=\n[A-Z][A-Z\s]+:|\nVEH\s*#|\nINSURED|\nLOSS|\nOWNER|\nDRIVER|\n\s*\d+\.|$)/i,

  //       // 2️⃣ Simple text file version
  //       /DESCRIPTION\s+OF\s+ACCIDENT[:\-\s]+([\s\S]*?)(?=\n(?:INSURED|OTHER|INJURED|REMARKS)\b|$)/i,

  //       // 3️⃣ Alternate phrasing (if present)
  //       /DESCRIBE\s+ACCIDENT[:\-\s]+([\s\S]*?)(?=\n(?:VEHICLE)\b|$)/i,
  //     ],
  //     [],
  //   );
  // }
  extractDescription(): string | undefined {
    return this.extractMultiLineField(
      [
        // ACORD PDF
        /DESCRIPTION OF ACCIDENT\s*\(ACORD 101, Additional Remarks Schedule, may be attached if more space is required\)\s*([\s\S]*?)(?=\n[A-Z][A-Z\s]+:|\nVEH\s*#|\nINSURED|\nLOSS|\nOWNER|\nDRIVER|\n\s*\d+\.|$)/i,

        // Simple text
        /DESCRIPTION\s+OF\s+ACCIDENT[:\-\s]+([\s\S]*?)(?=\n(?:INSURED|OTHER|INJURED|REMARKS)\b|$)/i,

        // Alternate phrasing
      ],
      [],
    );
  }

  /**
   * Extract contact information
   */
  extractContactInfo(): Partial<ExtractedFields> {
    const dob = this.extractSimpleField([
      /DATE OF BIRTH[^V]*\/V\(([^)]+)\)/i,
      /DATE OF BIRTH:?\s*([^\n]+)/i,
    ]);

    const address = this.extractSimpleField([
      /INSURED'S MAILING ADDRESS[^V]*\/V\(([^)]+)\)/i,
      /INSURED'S MAILING ADDRESS:?\s*([^\n]+)/i,
    ]);

    let phone = this.extractSimpleField([
      /PRIMARY PHONE[^V]*\/V\(([^)]+)\)/i,
      /PRIMARY PHONE:?\s*([^\n]+)/i,
    ]);

    if (phone) {
      phone = phone.replace(/(?:HOME|CELL|BUS).*$/i, "").trim();
    }

    const email = this.extractSimpleField([
      /PRIMARY E-MAIL[^V]*\/V\(([^)]+)\)/i,
      /PRIMARY E-MAIL:?\s*([^\n]+)/i,
      /E-MAIL:?\s*([^\n]+)/i,
    ]);

    return {
      dateOfBirth: dob && dob.length > 3 ? dob : undefined,
      insuredAddress: address && address.length > 5 ? address : undefined,
      contactNumber: phone && phone.length > 5 ? phone : undefined,
      email: email && email.includes("@") ? email : undefined,
    };
  }

  /**
   * Extract vehicle information
   */
  extractVehicleInfo(): Partial<ExtractedFields> {
    const vin = this.extractSimpleField([
      /V\.I\.N\.[^V]*\/V\(([^)]+)\)/i,
      /V\.I\.N\.:?\s*([^\n]+)/i,
      /VIN:?\s*([^\n]+)/i,
    ]);

    const year = this.extractSimpleField([
      /YEAR[^V]*\/V\((\d{4})\)/i,
      /YEAR:?\s*(\d{4})/i,
    ]);

    const make = this.extractSimpleField([
      /MAKE[^V]*\/V\(([^)]+)\)/i,
      /MAKE:?\s*([^\n]+?)(?=\s*MODEL|$)/i,
    ]);

    const model = this.extractSimpleField([
      /MODEL[^V]*\/V\(([^)]+)\)/i,
      /MODEL:?\s*([^\n]+?)(?=\s*BODY|$)/i,
    ]);

    const bodyType = this.extractSimpleField([
      /BODY TYPE[^V]*\/V\(([^)]+)\)/i,
      /BODY TYPE:?\s*([^\n]+)/i,
      /TYPE[^V]*\/V\(([^)]+)\)/i,
    ]);

    let plate = this.extractSimpleField([
      /PLATE NUMBER[^V]*\/V\(([^)]+)\)/i,
      /PLATE NUMBER:?\s*([^\n]+)/i,
    ]);

    if (plate) {
      plate = plate.replace(/STATE.*$/i, "").trim();
    }

    return {
      assetId: vin && vin.length > 5 ? vin : undefined,
      vehicleYear: year,
      vehicleMake: make && make.length > 1 ? make : undefined,
      vehicleModel: model && model.length > 1 ? model : undefined,
      assetType: bodyType && bodyType.length > 2 ? bodyType : undefined,
      plateNumber: plate && plate.length > 1 ? plate : undefined,
    };
  }

  /**
   * Extract damage description
   */
  extractDamageDescription(): string | undefined {
    return this.extractMultiLineField(
      [
        /DESCRIBE DAMAGE\s*([\s\S]*?)(?=\n\s*\d+\.\s+WAS A STANDARD CHILD PASSENGER RESTRAINT SYSTEM|\nESTIMATE AMOUNT|$)/i,
      ],
      [],
    );
  }

  /**
   * Extract estimated damage amount
   */
  extractEstimatedDamage(): number | undefined {
    const estimateValue = this.extractSimpleField([
      /ESTIMATE AMOUNT[^V]*\/V\(\$?\s*([0-9,]+)\)/i,
      /ESTIMATE AMOUNT:?\s*\$?\s*([0-9,]+)/i,
    ]);

    if (estimateValue) {
      const amount = parseFloat(estimateValue.replace(/,/g, ""));
      if (!isNaN(amount)) {
        return amount;
      }
    }

    // Try to find total amount
    const totalValue = this.extractSimpleField([
      /(?:Total|TOTAL).*?(?:estimate|damage|claim)[^V]*\/V\(\$?\s*([0-9,]+)\)/i,
      /(?:Total|TOTAL).*?(?:estimate|damage|claim).*?\$?\s*([0-9,]+)/i,
    ]);

    if (totalValue) {
      const amount = parseFloat(totalValue.replace(/,/g, ""));
      if (!isNaN(amount)) {
        return amount;
      }
    }

    return undefined;
  }

  /**
   * Extract vehicle location and availability
   */
  extractVehicleLocationInfo(): Partial<ExtractedFields> {
    const where = this.extractSimpleField([
      /WHERE CAN (?:VEHICLE|DAMAGE) BE SEEN[^V]*\/V\(([^)]+)\)/i,
      /WHERE CAN (?:VEHICLE|DAMAGE) BE SEEN\??:?\s*([^\n]+)/i,
    ]);

    const when = this.extractSimpleField([
      /WHEN CAN (?:VEHICLE|DAMAGE) BE SEEN[^V]*\/V\(([^)]+)\)/i,
      /WHEN CAN (?:VEHICLE|DAMAGE) BE SEEN\??:?\s*([^\n]+)/i,
    ]);

    return {
      vehicleLocation: where && where.length > 5 ? where : undefined,
      vehicleAvailability: when && when.length > 3 ? when : undefined,
    };
  }

  /**
   * Extract injury information
   */
  extractInjuryInfo(): Partial<ExtractedFields> {
    const injuries = this.extractMultiLineField(
      [
        /INJURED[^V]*\/V\(([^)]+)\)/i,
        /INJURED:?\s*([^\n]+(?:\n(?!(?:[A-Z\s]+:|REMARKS))[^\n]+)*)/i,
        /EXTENT OF INJURY[^V]*\/V\(([^)]+)\)/i,
      ],
      ["REMARKS", "OTHER INSURANCE", "REPORTED BY"],
    );

    let hasInjuries = false;
    if (injuries) {
      const lowerInjuries = injuries.toLowerCase();
      hasInjuries =
        lowerInjuries !== "none" &&
        lowerInjuries !== "no" &&
        injuries.length > 2;
    }

    return {
      injuries,
      hasInjuries,
    };
  }

  /**
   * Extract remarks
   */
  extractRemarks(): string | undefined {
    return this.extractMultiLineField(
      [
        /REMARKS\s*\(ACORD 101, Additional Remarks Schedule, may be attached if more space is required\)\s*([\s\S]*?)(?=\n[A-Z][A-Z\s]+:|\nOTHER INSURANCE|\nREPORTED BY|\nREPORTED TO|$)/i,
        /REMARKS:?\s*([^\n]+)/i,
      ],
      [],
    );
  }

  /**
   * Extract agency information
   */
  extractAgencyInfo(): Partial<ExtractedFields> {
    const agencyName = this.extractSimpleField([
      /AGENCY NAME[^V]*\/V\(([^)]+)\)/i,
      /AGENCY NAME:?\s*([^\n]+)/i,
    ]);

    const agencyId = this.extractSimpleField([
      /AGENCY CUSTOMER ID[^V]*\/V\(([^)]+)\)/i,
      /AGENCY CUSTOMER ID:?\s*([^\n]+)/i,
    ]);

    return {
      agencyName: agencyName && agencyName.length > 2 ? agencyName : undefined,
      agencyCustomerId: agencyId && agencyId.length > 1 ? agencyId : undefined,
    };
  }

  /**
   * Extract attachments
   */
  extractAttachments(): string | undefined {
    const value = this.extractSimpleField([
      /(?:Attachments|Photos|Documentation)[^V]*\/V\(([^)]+)\)/i,
      /(?:Attachments|Photos|Documentation):?\s*([^\n]+)/i,
    ]);
    return value && value.length > 2 ? value : undefined;
  }

  /**
   * Extract all fields
   */
  extractAll(): ExtractedFields {
    const fields: ExtractedFields = {
      policyNumber: this.extractPolicyNumber(),
      policyholderName: this.extractPolicyholderName(),
      carrier: this.extractCarrier(),
      naicCode: this.extractNaicCode(),
      effectiveDate: this.extractDate("(?:Policy\\s+)?Effective\\s+Date"),
      endDate: this.extractDate("(?:Policy\\s+)?End\\s+Date"),
      lineOfBusiness: this.extractLineOfBusiness(),
      incidentDate: this.extractIncidentDate(),
      incidentTime: this.extractIncidentTime(),
      location: this.extractLocation(),
      country: this.extractCountry(),
      policeContacted: this.extractPoliceContacted(),
      reportNumber: this.extractReportNumber(),
      description: this.extractDescription(),
      ...this.extractContactInfo(),
      ...this.extractVehicleInfo(),
      damageDescription: this.extractDamageDescription(),
      estimatedDamage: this.extractEstimatedDamage(),
      ...this.extractVehicleLocationInfo(),
      ...this.extractInjuryInfo(),
      attachments: this.extractAttachments(),
      remarks: this.extractRemarks(),
      ...this.extractAgencyInfo(),
    };

    // Set initial estimate same as estimated damage
    if (fields.estimatedDamage) {
      fields.initialEstimate = fields.estimatedDamage;
    }

    // Determine claim type
    fields.claimType = this.determineClaimType(fields);

    return fields;
  }

  /**
   * Determine claim type based on extracted data
   */
  private determineClaimType(fields: ExtractedFields): string {
    if (
      fields.hasInjuries ||
      this.text.toLowerCase().includes("injury") ||
      this.text.toLowerCase().includes("injured")
    ) {
      return "Auto - Injury";
    } else if (
      this.text.toLowerCase().includes("hail") ||
      this.text.toLowerCase().includes("weather")
    ) {
      return "Auto - Comprehensive";
    } else if (this.text.toLowerCase().includes("collision")) {
      return "Auto - Collision";
    } else if (fields.lineOfBusiness?.toLowerCase().includes("commercial")) {
      return "Commercial Auto - Property Damage";
    } else {
      return "Auto - Property Damage";
    }
  }
}

export default FieldExtractor;
