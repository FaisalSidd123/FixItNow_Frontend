import React, {
  useContext,
  useState,
  useEffect
} from "react";

import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Automatically syncs the authenticated user state to the backend
  const syncUserWithBackend = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch('http://localhost:5000/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Sync failed with status: ${response.status}. Details: ${errorData.details || errorData.error || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log('Backend user sync successful:', data);
    } catch (error) {
      console.error('Error syncing user with backend:', error);
    }
  };
  const checkAdminStatus = async (firebaseUser) => {
  try {

    const token = await firebaseUser.getIdToken();

    const response = await fetch(
      "http://localhost:5000/api/users/admin-check",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    const data = await response.json();

    setIsAdmin(data.isAdmin);

  } catch (error) {

    console.error("Admin check failed:", error);
    setIsAdmin(false);

  }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
   if (user) {

  setCurrentUser({ ...user });
  setUserLoggedIn(true);

  syncUserWithBackend(user);

  checkAdminStatus(user);

}
    
   else {

  setCurrentUser(null);
  setUserLoggedIn(false);
  setIsAdmin(false);

}
    setLoading(false);
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
      isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}