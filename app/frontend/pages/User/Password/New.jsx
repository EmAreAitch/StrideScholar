import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersPasswords, usersRegistrations, usersSessions } from '~/api'; // Adjust the import path based on your API routes

export default function PasswordReset() {
  const form = useForm({
    email: '',
  });

  const { data, setData, errors, processing } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }));    
    form.post(usersPasswords.create.path()); // Adjust the path according to your routes
  };

  return (
    <>
      <Head title="Forgot your password?" />
      <h2 className="text-2xl font-bold mb-4">Forgot your password?</h2>
      <form onSubmit={handleSubmit} className="max-w-md">      
        <div className="field mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setData('email', e.target.value)}
            autoFocus
            autoComplete="email"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email.join(', ')}</div>
          )}
        </div>
        
        <div className="actions mb-4">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {processing ? 'Sending instructions...' : 'Send me reset password instructions'}
          </button>
        </div>
      </form>
      
      {/* Links to other actions (optional) */}
      <div className="mt-4">
        <Link href={usersSessions.new.path()} className="text-blue-500 hover:underline block">Log in</Link>   
        <Link href={usersRegistrations.new.path()} className="text-blue-500 hover:underline block">Sign up</Link>        
      </div>
    </>
  );
}
