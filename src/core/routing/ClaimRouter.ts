class ClaimRouter {
  static route(
    fields: ExtractedFields,
    missingFields: string[],
  ): { route: string; reasoning: string } {
    const reasoning: string[] = [];

    // Check for missing fields first
    if (missingFields.length > 0) {
      reasoning.push(`Missing mandatory fields: ${missingFields.join(", ")}`);
      return { route: "Manual Review", reasoning: reasoning.join(" ") };
    }

    // Check for fraud indicators
    const fraudKeywords = ["fraud", "inconsistent", "staged"];
    const description = (fields.description || "").toLowerCase();
    const hasFraudIndicators = fraudKeywords.some((keyword) =>
      description.includes(keyword),
    );

    if (hasFraudIndicators) {
      reasoning.push(
        "Fraud indicators detected in description (keywords: fraud, inconsistent, or staged).",
      );
      return { route: "Investigation Queue", reasoning: reasoning.join(" ") };
    }

    // Check for injury claims
    const claimType = (fields.claimType || "").toLowerCase();
    if (claimType.includes("injury")) {
      reasoning.push(
        "Claim involves injury and requires specialist evaluation.",
      );
      return { route: "Specialist Queue", reasoning: reasoning.join(" ") };
    }

    // Check estimated damage
    const damage = fields.estimatedDamage || 0;
    if (damage < 25000) {
      reasoning.push(
        `Estimated damage ($${damage.toLocaleString()}) is below $25,000 threshold, qualifying for expedited processing.`,
      );
      return { route: "Fast-Track", reasoning: reasoning.join(" ") };
    } else {
      reasoning.push(
        `Estimated damage ($${damage.toLocaleString()}) exceeds $25,000, requiring standard review process.`,
      );
      return { route: "Standard Processing", reasoning: reasoning.join(" ") };
    }
  }
}

export default ClaimRouter;
