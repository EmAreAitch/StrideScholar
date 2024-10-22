import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersSessions, usersRegistrations, usersPasswords } from '~/api';

export default function SessionNew() {
  const form = useForm({
    email: '',
    password: '',
    remember_me: false,
  });
  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));
    form.post(usersSessions.create.path());
  };

  return (
    <>
      <Head title="Log in" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Log in</h2>
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
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password.join(', ')}</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="remember_me"
                  checked={data.remember_me}
                  onChange={(e) => setData('remember_me', e.target.checked)}
                  className="mr-2"
                />
                Remember me
              </label>
              <Link
                href={usersPasswords.new.path()}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="actions">
              <button
                type="submit"
                disabled={processing}
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                  processing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {processing ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href={usersRegistrations.new.path()}
              className="text-blue-500 hover:underline text-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
