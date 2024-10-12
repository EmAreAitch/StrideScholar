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
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
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
        <div className="field mb-4">
          <label htmlFor="password" className="block mb-1">
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
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="new-password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password.join(', ')}</div>
          )}
        </div>
        <div className="field mb-4">
          <label htmlFor="password_confirmation" className="block mb-1">Password confirmation</label>
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
        <div className="actions">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {processing ? 'Signing up...' : 'Sign up'}
          </button>
        </div>
      </form>
      <div className="mt-4">
        <Link href={usersSessions.new.path()} className="text-blue-500 hover:underline block">Log in</Link>
      </div>
    </>
  );
}