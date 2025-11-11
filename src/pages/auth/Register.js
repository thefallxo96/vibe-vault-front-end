import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register({ onSuccess }) {
  const { signUpWithPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(''); setOk(''); setSubmitting(true);
    try {
      await signUpWithPassword(email, password);
      setOk('Check your email to confirm your account.');
      onSuccess?.();
    } catch (error) {
      setErr(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {err && <div className="text-red-500 text-sm">{err}</div>}
        {ok && <div className="text-green-600 text-sm">{ok}</div>}
        <input
          className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          type="email" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} required
        />
        <input
          className="w-full p-3 rounded border dark:bg-gray-800 dark:border-gray-700"
          type="password" placeholder="Password" value={password}
          onChange={(e)=>setPassword(e.target.value)} required
        />
        <button
          className="w-full py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? 'Creating…' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
