import { XCircle } from 'lucide-react'

const ErrorDisplay = ({ error }: { error: string }) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 text-red-800">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">{error}</span>
            </div>
        </div>
    )
}

export default ErrorDisplay