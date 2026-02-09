class FieldValidator {
  private static requiredFields: ValidationField[] = [
    { key: "policyNumber", label: "Policy Number" },
    { key: "policyholderName", label: "Policyholder Name" },
    { key: "incidentDate", label: "Incident Date" },
    { key: "location", label: "Location" },
    { key: "description", label: "Description" },
    { key: "contactNumber", label: "Contact Number" },
    { key: "assetType", label: "Asset Type" },
    { key: "assetId", label: "Asset ID (VIN)" },
    { key: "estimatedDamage", label: "Estimated Damage" },
    { key: "claimType", label: "Claim Type" },
  ];

  static validate(fields: ExtractedFields): string[] {
    const missing: string[] = [];

    this.requiredFields.forEach((field) => {
      const value = fields[field.key];
      if (!this.isValidValue(value)) {
        missing.push(field.label);
      }
    });

    return missing;
  }

  private static isValidValue(value: any): boolean {
    if (value === undefined || value === null) return false;
    if (
      value === "N/A" ||
      value === "Not provided" ||
      value === "Unknown" ||
      value === "None"
    )
      return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (typeof value === "number" && value === 0) return false;
    return true;
  }
}

export default FieldValidator;
