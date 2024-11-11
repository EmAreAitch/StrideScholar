// app/javascript/Pages/Topics/Resources/Index.jsx
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Plus, Link, Image, Video, File, X, ExternalLink } from 'lucide-react';
import ResourceModal from './ResourceModal';
import {resources as resourcesApi} from "~/api"

const ResourceTypeIcons = {
  link: ExternalLink,
  image: Image,
  video: Video,
  document: File,
};

const TopicResources = ({ topic, resources, room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const deleteResource = (resourceId) => {

  router.delete(resourcesApi.destroy.path({
    room_id: room.id,
    topic_id: topic.id,
    id: resourceId
  }));
};

  return (
    <>
      <Head title={`Resources - ${topic.title}`} />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Resources for {topic.title}
          </h1>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {resources.map((resource) => {
              const IconComponent = ResourceTypeIcons[resource.resource_type] || File;
              
              return (
                <li key={resource.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IconComponent className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {resource.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Added by {resource.user.email} on {formatDate(resource.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        {resource.resource_type === 'link' ? (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Link
                          </a>
                        ) : (
                          <a
                            href={resource.file_url}
                            download
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Download
                          </a>
                        )}
                        
                        <button
                          onClick={() => deleteResource(resource.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topic={topic}
        room={room}
      />
    </>
  );
};

export default TopicResources;