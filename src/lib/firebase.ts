import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();

export const db = getFirestore(app);
export const storage = getStorage(app);

export const createUserDocument = async (email: string, userId: string, firstName: string, lastName: string) => {
  try {
    console.log('Creating user document with:', { email, userId, firstName, lastName });
    const userDocRef = doc(db, 'users', email);
    await setDoc(userDocRef, {
      userId,
      email,
      firstName,
      lastName,
      createdAt: new Date(),
    });
    console.log('User document created successfully!');
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};

export const fetchUserId = async (email) => {
  try {
    if (!email) {
      console.warn('No email provided to fetchUserId');
      return null;
    }

    console.log('Fetching user ID for email:', email);
    const userDocRef = doc(db, 'users', email);
    const userDocSnap = await getDoc(userDocRef);
    console.log('User document snapshot:', userDocSnap);

    if (userDocSnap.exists()) {
      const userId = userDocSnap.data().userId;
      console.log('User ID found:', userId);
      return userId;
    } else {
      console.log('User document not found for email:', email);
      return null;
    }
  } catch (error) {
    console.error('Error in fetchUserId:', error);
    return null;
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userId = await fetchUserId(user.email);
    if (userId) {
      Cookies.set('userId', userId, { httpOnly: true, secure: true });
      console.log('User ID stored in cookie:', userId);
    } else {
      console.warn('User ID not found, cookie not set.');
    }
  } else {
    console.log('User logged out, cookie not set.');
  }
});

export const signUpWithEmailAndPassword = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = uuidv4();
    await createUserDocument(email, userId, firstName, lastName);
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};