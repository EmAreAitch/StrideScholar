import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usersSessions, usersRegistrations, usersPasswords } from '~/api';

export default function SessionNew() {
  const form = useForm({
    email: '',
    password: '',
    remember_me: false,
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e) => {
    e.preventDefault();
    form.transform((data) => ({ user: data }))
    form.post(usersSessions.create.path())
      
  };

  return (
    <>
      <Head title="Log in" />
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
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
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setData('password', e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password.join(', ')}</div>
          )}
        </div>        
        <div className="field mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember_me"
              checked={data.remember_me}
              onChange={(e) => setData('remember_me', e.target.checked)}
              className="mr-2"
            />
            Remember me
          </label>
        </div>        
        <div className="actions">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {processing ? 'Logging in...' : 'Log in'}
          </button>
        </div>
      </form>
      <div className="mt-4">
        <Link href={usersRegistrations.new.path()} className="text-blue-500 hover:underline block">Sign up</Link>
        <Link href={usersPasswords.new.path()} className="text-blue-500 hover:underline block">Forgot your password?</Link>      
      </div>
    </>
  );
}
