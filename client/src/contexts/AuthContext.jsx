import React from "react";
import "../firebase";
import { useContext, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const authProvider = new GoogleAuthProvider();

const AuthContext = React.createContext({});
const auth = getAuth();

const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  const login = (callback) => {
    signInWithPopup(auth, authProvider).then((response) => {
      if (response) {
        callback(response);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth };
