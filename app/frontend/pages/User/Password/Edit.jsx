import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersPasswords, usersSessions } from '~/api'; // Adjust the import path based on your API routes

export default function PasswordChange({ resetPasswordToken, minimumPasswordLength }) {
  const form = useForm({
    reset_password_token: resetPasswordToken, // Pass the token received from the URL or props
    password: '',
    password_confirmation: '',
  });

  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));
    form.put(usersPasswords.update.path()); // Adjust the path to the proper update route
  };

  return (
    <>
      <Head title="Change your password" />
      <h2 className="text-2xl font-bold mb-4">Change your password</h2>
      
      <form onSubmit={handleSubmit} className="max-w-md">        
        {/* Hidden field for reset_password_token */}
        <input type="hidden" name="reset_password_token" value={data.reset_password_token} />

        <div className="field mb-4">
          <label htmlFor="password" className="block mb-1">New password</label>
          {minimumPasswordLength && (
            <em className="text-sm text-gray-500 block mb-1">({minimumPasswordLength} characters minimum)</em>
          )}
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setData('password', e.target.value)}
            autoFocus
            autoComplete="new-password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password.join(', ')}</div>
          )}
        </div>

        <div className="field mb-4">
          <label htmlFor="password_confirmation" className="block mb-1">Confirm new password</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={data.password_confirmation}
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            autoComplete="new-password"
          />
          {errors.password_confirmation && (
            <div className="text-red-500 text-sm mt-1">{errors.password_confirmation.join(', ')}</div>
          )}
        </div>

        <div className="actions mb-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {processing ? 'Changing password...' : 'Change my password'}
          </button>
        </div>
      </form>

      {/* Links to other actions (optional) */}
      <div className="mt-4">
        <Link href={usersSessions.new.path()} className="text-blue-500 hover:underline block">Log in</Link>
      </div>
    </>
  );
}
