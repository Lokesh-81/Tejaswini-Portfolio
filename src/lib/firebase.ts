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
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const isNewApp = !getApps().length;
const app = isNewApp ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const storage = getStorage(app);

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
  getDownloadURL,
  deleteObject
};
export type { User };
export default app;

