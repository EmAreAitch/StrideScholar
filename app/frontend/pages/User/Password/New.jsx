import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersPasswords, usersRegistrations, usersSessions } from '~/api';

export default function PasswordReset() {
  const form = useForm({
    email: '',
  });

  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));
    form.post(usersPasswords.create.path());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head title="Forgot your password?" />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Forgot your password?</h2>
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

          <div className="actions">
            <button
              type="submit"
              disabled={processing}
              className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                processing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {processing ? 'Sending instructions...' : 'Send me reset password instructions'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link href={usersSessions.new.path()} className="text-blue-500 hover:underline block">
            Log in
          </Link>
          <Link href={usersRegistrations.new.path()} className="text-blue-500 hover:underline block">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
