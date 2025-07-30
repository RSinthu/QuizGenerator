import React from 'react';
import { Youtube } from 'lucide-react';

function YouTubeUpload ({ state, actions }) {
  const { youtubeUrl } = state;
  const { setYoutubeUrl } = actions;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
        <Youtube className="w-6 h-6 text-red-600" />
        <span className="text-red-700 font-medium">YouTube Video URL</span>
      </div>
      <input
        type="url"
        placeholder="https://www.youtube.com/watch?v=..."
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
      />
      <div className="text-sm text-gray-600">
        <p className="mb-1"><strong>Supported formats:</strong></p>
        <ul className="list-disc list-inside space-y-1 text-gray-500">
          <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
          <li>https://youtu.be/VIDEO_ID</li>
          <li>https://www.youtube.com/embed/VIDEO_ID</li>
        </ul>
      </div>
    </div>
  );
};

export default YouTubeUpload;