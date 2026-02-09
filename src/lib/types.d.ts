interface ExtractedFields {
  [key: string]: string | number | boolean | undefined;
  policyNumber?: string;
  policyholderName?: string;
  effectiveDate?: string;
  endDate?: string;
  carrier?: string;
  naicCode?: string;
  lineOfBusiness?: string;
  incidentDate?: string;
  incidentTime?: string;
  location?: string;
  country?: string;
  policeContacted?: string;
  reportNumber?: string;
  description?: string;
  dateOfBirth?: string;
  insuredAddress?: string;
  contactNumber?: string;
  email?: string;
  assetId?: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  assetType?: string;
  plateNumber?: string;
  damageDescription?: string;
  estimatedDamage?: number;
  initialEstimate?: number;
  vehicleLocation?: string;
  vehicleAvailability?: string;
  injuries?: string;
  hasInjuries?: boolean;
  claimType?: string;
  attachments?: string;
  remarks?: string;
  agencyName?: string;
  agencyCustomerId?: string;
}

interface SampleDocument {
  name: string;
  content: string;
}
interface ValidationField {
  key: keyof ExtractedFields;
  label: string;
}

interface ProcessingResult {
  extractedFields: ExtractedFields;
  missingFields: string[];
  recommendedRoute: string;
  reasoning: string;
}

type RouteType =
  | "Fast-Track"
  | "Manual Review"
  | "Investigation Queue"
  | "Specialist Queue"
  | "Standard Processing"
  | "";
