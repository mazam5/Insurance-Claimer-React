
const LoadingSpinner = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing claim document...</p>
        </div>
    )
}

export default LoadingSpinner