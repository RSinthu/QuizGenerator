// components/ContentTypeSelection.js
import React from 'react';
import { FileText, Youtube, Globe } from 'lucide-react';

function ContentTypeSelection ({ setContentType, setStep }){
  const contentOptions = [
    {
      id: 'pdf',
      title: 'PDF Document',
      description: 'Upload PDF files to extract text and generate content',
      icon: FileText,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      hoverBg: 'group-hover:bg-red-200',
      hoverBorder: 'hover:border-blue-300',
      perfectFor: [
        'Research papers',
        'Textbooks & articles',
        'Reports & documents',
        'Academic materials'
      ]
    },
    {
      id: 'youtube',
      title: 'YouTube Video',
      description: 'Process YouTube videos using transcripts and captions',
      icon: Youtube,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      hoverBg: 'group-hover:bg-red-200',
      hoverBorder: 'hover:border-red-300',
      perfectFor: [
        'Educational videos',
        'Lectures & tutorials',
        'Documentaries',
        'Online courses'
      ]
    },
    {
      id: 'websearch',
      title: 'Web Search',
      description: 'Research topics using web search to gather comprehensive information',
      icon: Globe,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverBg: 'group-hover:bg-green-200',
      hoverBorder: 'hover:border-green-300',
      perfectFor: [
        'Current topics',
        'Research questions',
        'Latest developments',
        'Comprehensive overviews'
      ]
    }
  ];

  const handleOptionSelect = (optionId) => {
    setContentType(optionId);
    setStep('upload');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Content Source</h2>
        <p className="text-gray-600">Select how you want to provide content for processing</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {contentOptions.map((option) => {
          const Icon = option.icon;
          
          return (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer border-2 border-transparent ${option.hoverBorder} hover:shadow-xl transition-all group`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 ${option.hoverBg} transition-colors`}>
                  <Icon className={`w-8 h-8 ${option.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="text-sm text-gray-500">
                  <div className="font-medium mb-2">Perfect for:</div>
                  <ul className="text-left space-y-1">
                    {option.perfectFor.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentTypeSelection;