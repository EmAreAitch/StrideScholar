import React from 'react';
import { File } from 'lucide-react';

const ResourceViewer = ({ resource }) => {
  const renderContent = () => {
    switch (resource.resource_type) {
      case 'image':
        return (
          <div className="relative w-full h-64">
            <img
              src={resource.file_url}
              alt={resource.title}
              className="object-contain w-full h-full rounded-md"
            />
          </div>
        );
        
      case 'video':
        return (
          <div className="relative w-full aspect-video">
            <video
              controls
              className="w-full rounded-md"
              preload="metadata"
            >
              <source src={resource.file_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
        
      case 'document':
        // Check if it's a PDF by file extension or MIME type
        if (resource.file_url?.toLowerCase().endsWith('.pdf')) {
          return (
            <div className="relative w-full h-[600px]">
              <iframe
                src={resource.file_url}
                title={resource.title}
                className="w-full h-full rounded-md border border-gray-200"
              />
            </div>
          );
        }
        // Fallback for other document types
        return (
          <div className="flex items-center justify-center p-4 bg-gray-50 rounded-md">
            <File className="h-8 w-8 text-gray-400" />
            <a
              href={resource.file_url}
              download
              className="ml-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              Download {resource.title}
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-2 mb-4">
      {renderContent()}
    </div>
  );
};

export default ResourceViewer;