import type { ProcessingResult } from "../../types"

const JsonOutput = ({ result }: { result: ProcessingResult }) => {
    return (
        <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">JSON Output</h3>
                <button
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                    Copy JSON
                </button>
            </div>
            <pre className="text-green-400 text-sm overflow-x-auto">
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    )
}

export default JsonOutput