import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, Copy, Check } from 'lucide-react';


function SummaryResults({ summary, resetApp }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Summary Export</title>
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 40px 20px;
              color: #333;
            }
            h1 { 
              color: #2563eb; 
              border-bottom: 3px solid #e5e7eb; 
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            h2 { 
              color: #1f2937; 
              margin-top: 30px;
              margin-bottom: 15px; 
            }
            h3 { 
              color: #374151; 
              margin-top: 25px;
              margin-bottom: 10px; 
            }
            p { 
              margin-bottom: 15px;
              text-align: justify;
            }
            ul, ol { 
              margin-bottom: 15px;
              padding-left: 25px;
            }
            li { 
              margin-bottom: 5px; 
            }
            strong { 
              color: #1f2937; 
              font-weight: 600;
            }
            em { 
              color: #6b7280; 
            }
            code {
              background-color: #f3f4f6;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'Courier New', monospace;
              font-size: 0.9em;
            }
            blockquote {
              border-left: 4px solid #e5e7eb;
              margin: 20px 0;
              padding-left: 20px;
              color: #6b7280;
              font-style: italic;
            }
            .date { 
              color: #6b7280; 
              font-size: 14px; 
              margin-top: 40px;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Content Summary</h1>
          </div>
          <div class="summary-content">
            ${summary.replace(/\n/g, '<br>')}
          </div>
          <div class="date">
            Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToTXT = () => {
    const element = document.createElement('a');
    const file = new Blob([`Content Summary\n${'='.repeat(50)}\n\n${summary}\n\nGenerated on: ${new Date().toLocaleDateString()}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `summary_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportToMarkdown = () => {
    const element = document.createElement('a');
    const markdownContent = `# Content Summary\n\n${summary}\n\n---\n*Generated on: ${new Date().toLocaleDateString()}*`;
    const file = new Blob([markdownContent], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `summary_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Custom components for ReactMarkdown
  const markdownComponents = {
    h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4">{children}</h3>,
    p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 ml-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1 ml-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
    code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-6 border-gray-300" />,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Summary</h3>
        <div className="flex space-x-3">
          <button
            onClick={copyToClipboard}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </button>
          <div className="relative group">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            {/* Enhanced dropdown menu */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={exportToPDF}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-lg flex items-center"
              >
                <span className="text-red-500 mr-2">📄</span>
                Export as PDF
              </button>
              <button
                onClick={exportToMarkdown}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center"
              >
                <span className="text-blue-500 mr-2">📝</span>
                Export as Markdown
              </button>
              <button
                onClick={exportToTXT}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-lg flex items-center"
              >
                <span className="text-gray-500 mr-2">📋</span>
                Export as TXT
              </button>
            </div>
          </div>
          <button
            onClick={resetApp}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            New Content
          </button>
        </div>
      </div>
      
      {/* ReactMarkdown Formatted Summary Content */}
      <div className="prose max-w-none">
        <div className="formatted-summary">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {summary}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Word count: {summary.split(' ').filter(word => word.length > 0).length} | 
            Characters: {summary.length}
          </span>
          <span>Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}

export default SummaryResults;