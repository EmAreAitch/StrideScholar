import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersPasswords, usersSessions } from '~/api';

export default function PasswordChange({ resetPasswordToken, minimumPasswordLength }) {
  const form = useForm({
    reset_password_token: resetPasswordToken,
    password: '',
    password_confirmation: '',
  });

  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));
    form.put(usersPasswords.update.path());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Head title="Change your password" />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Change your password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">        
          {/* Hidden field for reset_password_token */}
          <input type="hidden" name="reset_password_token" value={data.reset_password_token} />

          <div className="field mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">New password</label>
            {minimumPasswordLength && (
              <em className="text-sm text-gray-500 block mb-1">({minimumPasswordLength} characters minimum)</em>
            )}
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={(e) => setData('password', e.target.value)}
              autoFocus
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password.join(', ')}</p>
            )}
          </div>

          <div className="field mb-4">
            <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-700">Confirm new password</label>
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

          <div className="actions mb-4">
            <button
              type="submit"
              disabled={processing}
              className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                processing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {processing ? 'Changing password...' : 'Change my password'}
            </button>
          </div>
        </form>

        {/* Optional links to other actions */}
        <div className="mt-4 text-center">
          <Link href={usersSessions.new.path()} className="text-blue-500 hover:underline block">Log in</Link>
        </div>
      </div>
    </div>
  );
}
