import { FileText } from 'lucide-react'
import SAMPLE_DOCUMENTS from '../../constants/sampleDocuments'

const SampleDocumentSelector = ({ handleSampleDocument }: { handleSampleDocument: (doc: any) => void }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Try Sample ACORD Documents:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SAMPLE_DOCUMENTS.map((doc, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSampleDocument(doc)}
                        className="p-4 border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left"
                    >
                        <FileText className="w-5 h-5 text-indigo-600 mb-2" />
                        <div className="font-medium text-gray-800 text-sm">{doc.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {doc.name.includes('001') && 'Fast-track - Low damage'}
                            {doc.name.includes('002') && 'Missing mandatory fields'}
                            {doc.name.includes('003') && 'Fraud indicators present'}
                            {doc.name.includes('004') && 'Personal injury claim'}
                            {doc.name.includes('005') && 'High value commercial'}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SampleDocumentSelector