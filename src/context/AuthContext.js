// ✅ src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ Return promises so Profile.js can await them
  const login = async (email, password) =>
    await supabase.auth.signInWithPassword({ email, password });

  const signup = async (email, password) =>
    await supabase.auth.signUp({ email, password });

  const logout = () => supabase.auth.signOut();

  // ✅ GOOGLE LOGIN
  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

  // ✅ APPLE LOGIN
  const signInWithApple = () =>
    supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: window.location.origin },
    });

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, signInWithGoogle, signInWithApple }}
    >
      {children}
    </AuthContext.Provider>
  );
};
