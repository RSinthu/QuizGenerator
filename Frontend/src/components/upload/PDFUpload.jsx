import React from 'react';
import { Upload } from 'lucide-react';

function PDFUpload ({ state, actions }) {
  const { file, fileInputRef } = state;
  const { setFile } = actions;

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      {file ? (
        <div>
          <p className="text-lg font-medium text-green-600 mb-2">{file.name}</p>
          <p className="text-sm text-gray-500">File size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      ) : (
        <div>
          <p className="text-lg text-gray-600 mb-2">Drop your PDF here or click to browse</p>
          <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default PDFUpload;