import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut as fbSignOut, 
  onAuthStateChanged,
  updatePassword as fbUpdatePassword,
  sendPasswordResetEmail,
  getIdTokenResult,
  User 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import bundledFirebaseConfig from '../../firebase-applet-config.json';

// Support customizable environment variables for migration to a new Firebase project or Vercel deployment
const envFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID,
};

// Use environment variables if provided, otherwise fallback to bundled config
const activeFirebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  firestoreDatabaseId?: string;
} = {
  apiKey: envFirebaseConfig.apiKey || bundledFirebaseConfig.apiKey,
  authDomain: envFirebaseConfig.authDomain || bundledFirebaseConfig.authDomain || `${bundledFirebaseConfig.projectId}.firebaseapp.com`,
  projectId: envFirebaseConfig.projectId || bundledFirebaseConfig.projectId,
  storageBucket: envFirebaseConfig.storageBucket || bundledFirebaseConfig.storageBucket || `${bundledFirebaseConfig.projectId}.firebasestorage.app`,
  messagingSenderId: envFirebaseConfig.messagingSenderId || bundledFirebaseConfig.messagingSenderId,
  appId: envFirebaseConfig.appId || bundledFirebaseConfig.appId,
  firestoreDatabaseId: envFirebaseConfig.firestoreDatabaseId || (bundledFirebaseConfig as any).firestoreDatabaseId || undefined,
};

const isNewApp = !getApps().length;
const app = isNewApp ? initializeApp(activeFirebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = activeFirebaseConfig.firestoreDatabaseId
  ? getFirestore(app, activeFirebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const storage = getStorage(app);

export const activeFirebaseConfigPublic = activeFirebaseConfig;
export const currentFirebaseProjectId = activeFirebaseConfig.projectId;
export const currentFirebaseStorageBucket = activeFirebaseConfig.storageBucket;

export async function testFirestoreConnection() {
  return true;
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  fbSignOut,
  onAuthStateChanged,
  fbUpdatePassword,
  sendPasswordResetEmail,
  getIdTokenResult,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
};
export type { User };
export default app;

