// components/StepIndicator.js
import React from 'react';
import { Brain, Search, CheckCircle, FileText, Youtube, Globe } from 'lucide-react';

function StepIndicator({ step, contentType }) {
  const getUploadStepName = () => {
    switch (contentType) {
      case 'pdf': return 'Upload PDF';
      case 'youtube': return 'Enter URL';
      default: return 'Input';
    }
  };

  const getUploadStepIcon = () => {
    switch (contentType) {
      case 'pdf': return FileText;
      case 'youtube': return Youtube;
      default: return Search;
    }
  };

  const steps = [
    { id: 'select', name: 'Select Type', icon: Brain },
    { id: 'upload', name: getUploadStepName(), icon: getUploadStepIcon() },
    { id: 'configure', name: 'Configure', icon: Search },
    { id: 'results', name: 'Results', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((stepItem, index) => {
        const Icon = stepItem.icon;
        const isActive = step === stepItem.id;
        const isCompleted = index < currentStepIndex;

        return (
          <div key={stepItem.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              isActive 
                ? 'bg-blue-500 border-blue-500 text-white' 
                : isCompleted 
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 text-gray-400'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`ml-2 text-sm font-medium ${
              isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
            }`}>
              {stepItem.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-4 ${
                isCompleted ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;