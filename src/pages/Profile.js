// ✅ src/pages/Profile.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, login, signup, logout, signInWithGoogle, signInWithApple } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const { error } = await login(email, password);
    if (error) setError(error.message);
  }

  async function handleSignup() {
    const { error } = await signup(email, password);
    if (error) setError(error.message);
  }

  if (user) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
        <button onClick={logout} className="px-6 py-2 bg-red-600 text-white rounded-lg">
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Login / Register</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-4 p-3 border rounded-lg"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-4 p-3 border rounded-lg"
      />

      <button
        onClick={handleLogin}
        className="w-full mb-3 p-3 bg-indigo-600 text-white rounded-lg"
      >
        Log In
      </button>

      <button
        onClick={handleSignup}
        className="w-full p-3 bg-green-600 text-white rounded-lg"
      >
        Create Account
      </button>

      <hr className="my-6" />

      <button
        onClick={signInWithGoogle}
        className="w-full mb-3 p-3 bg-red-600 text-white rounded-lg"
      >
        Continue with Google
      </button>

      <button
        onClick={signInWithApple}
        className="w-full p-3 bg-black text-white rounded-lg"
      >
        Continue with Apple
      </button>
    </div>
  );
}
