import FieldExtractor from "../extractors/FieldExtractor";
import ClaimRouter from "../routing/ClaimRouter";
import FieldValidator from "../validators/FieldValidator";

class ClaimProcessor {
  static process(text: string): ProcessingResult {
    const extractor = new FieldExtractor(text);
    const extractedFields = extractor.extractAll();
    const missingFields = FieldValidator.validate(extractedFields);
    const { route, reasoning } = ClaimRouter.route(
      extractedFields,
      missingFields,
    );

    return {
      extractedFields,
      missingFields,
      recommendedRoute: route,
      reasoning,
    };
  }
}

export default ClaimProcessor;
