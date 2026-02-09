import { AlertCircle } from 'lucide-react'

const MissingFieldsWarning = ({ result }: { result: ProcessingResult }) => {
    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Missing Fields Detected</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {result.missingFields.map((field, idx) => (
                    <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {field}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default MissingFieldsWarning