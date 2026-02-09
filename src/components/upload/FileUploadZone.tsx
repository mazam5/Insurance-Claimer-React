import { Upload } from 'lucide-react';

const FileUploadZone = ({ inputRef, handleFileUpload, onDrop, isDragging, setIsDragging }: any) => {
    return (
        <div
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 cursor-pointer transition-colors ${isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 hover:border-indigo-400"
                }`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-indigo-600 font-semibold">Upload FNOL document</p>
            <p className="text-sm text-gray-500 mt-2">Click or drag & drop (TXT, PDF)</p>
            <input
                ref={inputRef}
                type="file"
                accept=".txt,.pdf"
                onChange={handleFileUpload}
                className="hidden"
            />
        </div>
    )
}

export default FileUploadZone