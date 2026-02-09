import { FileText } from 'lucide-react';
import React, { useRef, useState, type ChangeEvent } from 'react';
import ErrorDisplay from './components/common/ErrorDisplay';
import LoadingSpinner from './components/common/LoadingSpinner';
import ExtractedFieldsDisplay from './components/results/ExtractedFieldsDisplay';
import JsonOutput from './components/results/JsonOutput';
import MissingFieldsWarning from './components/results/MissingFieldsWarning';
import RoutingDecision from './components/results/RoutingDecision';
import FileUploadZone from './components/upload/FileUploadZone';
import SampleDocumentSelector from './components/upload/SampleDocumentSelector';
import ClaimProcessor from './core/processor/ClaimProcessor';
import { ToggleTheme } from './components/theme/ToggleTheme';

// ===========================
// MAIN COMPONENT
// ===========================

const InsuranceClaimsAgent: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [result, setResult] = useState<ProcessingResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        console.log(file);


        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            handleFileUpload({ target: { files: [droppedFile] } } as unknown as ChangeEvent<HTMLInputElement>);
        }
    };

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const uploadedFile = e.target.files?.[0];
        if (!uploadedFile) return;

        setFile(uploadedFile);
        setProcessing(true);
        setError(null);
        setResult(null);

        try {
            const text = await uploadedFile.text();
            setTimeout(() => {
                const processedResult = ClaimProcessor.process(text);
                setResult(processedResult);
                setProcessing(false);
            }, 800);
        } catch (err) {
            setError('Error reading file. Please ensure it is a valid text file.');
            setProcessing(false);
        }
    };

    const handleSampleDocument = (doc: SampleDocument): void => {
        setFile({ name: doc.name } as File);
        setProcessing(true);
        setError(null);
        setResult(null);

        setTimeout(() => {
            const processedResult = ClaimProcessor.process(doc.content);
            setResult(processedResult);
            setProcessing(false);
        }, 800);
    };



    const formatFieldName = (key: string): string => {
        return key.replace(/([A-Z])/g, ' $1').trim();
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Insurance Claims Processing Agent</h1>
                        </div>
                        <ToggleTheme />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Autonomous FNOL document analysis with intelligent routing</p>

                    {/* Upload Section */}
                    <FileUploadZone inputRef={inputRef} handleFileUpload={handleFileUpload} onDrop={onDrop} isDragging={isDragging} setIsDragging={setIsDragging} />

                    {/* Sample Documents */}
                    <SampleDocumentSelector handleSampleDocument={handleSampleDocument} />
                </div>

                {/* Processing Indicator */}
                {processing && (
                    <LoadingSpinner />
                )}

                {/* Error Display */}
                {error && (
                    <ErrorDisplay error={error} />
                )}

                {/* Results Display */}
                {result && (
                    <div className="space-y-6">
                        {/* Routing Decision */}
                        <RoutingDecision result={result} />

                        {/* Missing Fields Warning */}
                        {result.missingFields.length > 0 && (
                            <MissingFieldsWarning result={result} />
                        )}

                        {/* Extracted Fields */}
                        <ExtractedFieldsDisplay result={result} formatFieldName={formatFieldName} />

                        {/* JSON Output */}
                        <JsonOutput result={result} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InsuranceClaimsAgent;