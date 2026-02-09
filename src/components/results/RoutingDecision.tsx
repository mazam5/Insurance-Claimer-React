import { AlertCircle, ArrowRight, CheckCircle, FileText, XCircle } from 'lucide-react';
import React from 'react'
import type { ProcessingResult } from '../../types';

const RoutingDecision = ({ result }: { result: ProcessingResult }) => {
    const getRouteColor = (route: RouteType): string => {
        switch (route) {
            case 'Fast-Track': return 'text-green-600 bg-green-50 border-green-200';
            case 'Manual Review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Investigation Queue': return 'text-red-600 bg-red-50 border-red-200';
            case 'Specialist Queue': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'Standard Processing': return 'text-purple-600 bg-purple-50 border-purple-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getRouteIcon = (route: RouteType): React.ReactNode => {
        switch (route) {
            case 'Fast-Track': return <CheckCircle className="w-5 h-5" />;
            case 'Manual Review': return <AlertCircle className="w-5 h-5" />;
            case 'Investigation Queue': return <XCircle className="w-5 h-5" />;
            case 'Specialist Queue': return <FileText className="w-5 h-5" />;
            default: return <ArrowRight className="w-5 h-5" />;
        }
    };
    return (
        <div className={`rounded-lg border-2 p-6 ${getRouteColor(result.recommendedRoute as RouteType)}`}>
            <div className="flex items-center gap-3 mb-3">
                {getRouteIcon(result.recommendedRoute as RouteType)}
                <h2 className="text-2xl font-bold">Recommended Route: {result.recommendedRoute}</h2>
            </div>
            <p className="text-sm font-medium">{result.reasoning}</p>
        </div>
    )
}

export default RoutingDecision