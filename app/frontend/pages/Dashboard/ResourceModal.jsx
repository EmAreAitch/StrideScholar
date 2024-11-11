import React from 'react';
import { useForm } from '@inertiajs/react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import {resources} from "~/api"

const ResourceModal = ({ isOpen, onClose, topic, room }) => {
  const { data, setData, post, processing, errors, reset, transform } = useForm({
    title: '',
    resource_type: 'link',
    url: '',
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    transform((data) => ({ resource: data }));
    post(resources.create.path({
      room_id: room.id, 
      topic_id: topic.id 
    }), {
      onSuccess: () => {
        reset();
        onClose();
      },
      preserveScroll: true,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('file', file);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white rounded-lg w-full max-w-md">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Add New Resource
            </Dialog.Title>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Resource Type
                  </label>
                  <select
                    value={data.resource_type}
                    onChange={e => setData('resource_type', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="link">External Link</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                </div>

                {data.resource_type === 'link' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      URL
                    </label>
                    <input
                      type="url"
                      value={data.url}
                      onChange={e => setData('url', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    {errors.url && (
                      <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      File
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1 block w-full"
                    />
                    {errors.file && (
                      <p className="mt-1 text-sm text-red-600">{errors.file}</p>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {processing ? 'Adding...' : 'Add Resource'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ResourceModal;