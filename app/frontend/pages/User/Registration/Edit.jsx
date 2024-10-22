import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersRegistrations, usersSessions } from '~/api';

export default function RegistrationEdit({ user, minimumPasswordLength }) {
  const form = useForm({
    email: user.email || '',
    password: '',
    password_confirmation: '',
    current_password: '',
  });

  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));
    form.patch(usersRegistrations.update.path());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head title="Update User" />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Update User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="field mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => setData('email', e.target.value)}
              autoFocus
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email.join(', ')}</p>
            )}
          </div>

          <div className="field mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password <i>(leave blank if you don't want to change it)</i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => setData('password', e.target.value)}
              autoComplete="new-password"
            />
            {minimumPasswordLength && (
              <em className="text-sm text-gray-500 block mb-1">
                ({minimumPasswordLength} characters minimum)
              </em>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.join(', ')}</p>
            )}
          </div>

          <div className="field mb-4">
            <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-700">
              Password confirmation
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={data.password_confirmation}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              autoComplete="new-password"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-2">{errors.password_confirmation.join(', ')}</p>
            )}
          </div>

          <div className="field mb-4">
            <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-700">
              Current password <i>(we need your current password to confirm your changes)</i>
            </label>
            <input
              type="password"
              name="current_password"
              id="current_password"
              value={data.current_password}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.current_password ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => setData('current_password', e.target.value)}
              autoComplete="current-password"
            />
            {errors.current_password && (
              <p className="text-red-500 text-sm mt-2">{errors.current_password.join(', ')}</p>
            )}
          </div>

          <div className="actions">
            <button
              type="submit"
              disabled={processing}
              className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                processing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {processing ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
