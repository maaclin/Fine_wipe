import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  User,
  AuthError
} from "firebase/auth";
import { auth, createUserDocument } from "../lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        Cookies.set('auth', 'true', { expires: 7 }); // Set cookie for 7 days
      } else {
        Cookies.remove('auth');
      }
      setAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  async function signIn(email: string, password: string) {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      return result.user;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(email: string, password: string, firstName: string, lastName: string) {
    setIsLoading(true);
    try {
      const userId = uuidv4();
      const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(result.user, {
        displayName: `${firstName} ${lastName}`
      });
      await createUserDocument(email.trim(), userId, firstName, lastName);
      return result.user;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      Cookies.remove('auth');
      await signOut(auth);
    } finally {
      setIsLoading(false);
    }
  }

  return { 
    user,
    signIn,
    register,
    logout,
    isLoading,
    authInitialized
  };
}
