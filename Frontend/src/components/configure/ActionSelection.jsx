import React from 'react';
import { FileText, Brain } from 'lucide-react';

function ActionSelection ({ state, actions }) {
  const { contentType, actionType } = state;
  const { setActionType } = actions;

  const actionOptions = [
    {
      id: 'summarize',
      title: 'Generate Summary',
      description: 'Create a comprehensive summary of your content',
      icon: FileText,
      color: 'green',
      features: [
        'Key points extraction',
        'Main themes identification',
        'Structured overview',
        'Exportable format'
      ]
    },
    {
      id: 'quiz',
      title: 'Generate Quiz',
      description: contentType === 'websearch' 
        ? 'Create interactive questions based on web research of your topic'
        : 'Create interactive questions from your content',
      icon: Brain,
      color: 'blue',
      features: [
        'Multiple choice questions',
        'Instant feedback',
        'Score tracking',
        'Customizable difficulty'
      ]
    }
  ];

  const getColorClasses = (color, isSelected) => {
    const colors = {
      green: {
        border: isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300',
        iconBg: isSelected ? 'bg-green-200' : 'bg-green-100',
        iconColor: 'text-green-600'
      },
      blue: {
        border: isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300',
        iconBg: isSelected ? 'bg-blue-200' : 'bg-blue-100',
        iconColor: 'text-blue-600'
      }
    };
    return colors[color];
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {actionOptions.map((option) => {
        // Only show summarize option for PDF and YouTube
        if (option.id === 'summarize' && contentType === 'websearch') {
          return null;
        }

        const Icon = option.icon;
        const isSelected = actionType === option.id;
        const colorClasses = getColorClasses(option.color, isSelected);
        const colSpan = contentType === 'websearch' ? 'md:col-span-2' : '';

        return (
          <div
            key={option.id}
            className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all cursor-pointer ${colorClasses.border} ${colSpan}`}
            onClick={() => setActionType(option.id)}
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses.iconBg}`}>
                <Icon className={`w-8 h-8 ${colorClasses.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold">{option.title}</h3>
              <p className="text-gray-600 mt-2">{option.description}</p>
            </div>
            <div className="text-sm text-gray-500">
              <ul className="list-disc list-inside space-y-1">
                {option.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
                {option.id === 'quiz' && contentType === 'websearch' && (
                  <li>Based on current web information</li>
                )}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActionSelection;