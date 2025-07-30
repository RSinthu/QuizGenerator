import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PDFUpload from './upload/PDFUpload';
import YouTubeUpload from './upload/YouTubeUpload';
import WebSearchUpload from './upload/WebSearchUpload';

function ContentUpload ({ state, actions }) {
  const { contentType } = state;
  const { setStep } = actions;

  const canProceedFromUpload = () => {
    if (contentType === 'pdf') return state.file;
    if (contentType === 'youtube') return state.youtubeUrl.trim();
    if (contentType === 'websearch') return state.webSearchQuery.trim();
    return false;
  };

  const getTitle = () => {
    switch (contentType) {
      case 'pdf': return 'Upload Your PDF';
      case 'youtube': return 'Enter YouTube URL';
      case 'websearch': return 'Configure Web Search';
      default: return 'Upload Content';
    }
  };

  const getDescription = () => {
    switch (contentType) {
      case 'pdf': return 'Drag and drop your PDF file or click to browse';
      case 'youtube': return 'Paste the YouTube video URL you want to process';
      case 'websearch': return 'Enter your main search query and specific topics to research';
      default: return 'Please provide your content';
    }
  };

  const renderUploadComponent = () => {
    switch (contentType) {
      case 'pdf':
        return <PDFUpload state={state} actions={actions} />;
      case 'youtube':
        return <YouTubeUpload state={state} actions={actions} />;
      case 'websearch':
        return <WebSearchUpload state={state} actions={actions} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {getTitle()}
        </h2>
        <p className="text-gray-600">
          {getDescription()}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        {renderUploadComponent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep('select')}
          className="flex items-center px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          onClick={() => setStep('configure')}
          disabled={!canProceedFromUpload()}
          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ContentUpload;