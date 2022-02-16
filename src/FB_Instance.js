import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);
export const authService = getAuth();

export const create_Email_Login = async (email, password) => {
  return await createUserWithEmailAndPassword(authService, email, password);
};
export const signIn_Whth_Email = async (email, password) => {
  return await signInWithEmailAndPassword(authService, email, password);
};

export const Auth_State_Changed = (func) => {
  onAuthStateChanged(authService, func);
};
