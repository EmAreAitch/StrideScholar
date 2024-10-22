import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersRegistrations, usersSessions } from '~/api';

export default function RegistrationNew({ minimumPasswordLength }) {
  const form = useForm({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));
    form.post(usersRegistrations.create.path());
  };

  return (
    <>
      <Head title="Sign up" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="field mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
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
                Password
                {minimumPasswordLength && (
                  <em className="text-sm text-gray-500 ml-1">
                    ({minimumPasswordLength} characters minimum)
                  </em>
                )}
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password.join(', ')}</p>
              )}
            </div>

            <div className="field mb-4">
              <label
                htmlFor="password_confirmation"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
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

            <div className="actions">
              <button
                type="submit"
                disabled={processing}
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                  processing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {processing ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href={usersSessions.new.path()}
              className="text-blue-500 hover:underline text-sm"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
