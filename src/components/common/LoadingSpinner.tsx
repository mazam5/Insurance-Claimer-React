
const LoadingSpinner = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Processing claim document...</p>
        </div>
    )
}

export default LoadingSpinner