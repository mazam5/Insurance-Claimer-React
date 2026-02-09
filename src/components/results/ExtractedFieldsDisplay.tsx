
const MAX_LENGTH = 500

const truncate = (value: string, max = MAX_LENGTH) =>
    value.length > max ? value.slice(0, max) + "…" : value

const ExtractedFieldsDisplay = ({
    result,
    formatFieldName,
}: {
    result: ProcessingResult
    formatFieldName: (key: string) => string
}) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Extracted Fields
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result.extractedFields).map(([key, value]) => {
                    let displayValue: string

                    if (value === undefined || value === null) {
                        displayValue = "N/A"
                    } else if (typeof value === "number") {
                        displayValue = `$${value.toLocaleString()}`
                    } else if (typeof value === "boolean") {
                        displayValue = value ? "Yes" : "No"
                    } else {
                        displayValue = truncate(String(value))
                    }

                    return (
                        <div
                            key={key}
                            className="border-l-4 border-indigo-400 pl-4 py-2"
                        >
                            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium capitalize">
                                {formatFieldName(key)}
                            </div>
                            <div className="text-gray-800 font-semibold wrap-break-word dark:text-gray-200">
                                {displayValue}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ExtractedFieldsDisplay
