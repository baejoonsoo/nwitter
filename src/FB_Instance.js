import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

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

export const googleProvider = () => new GoogleAuthProvider();

export const githubProvider = () => new GithubAuthProvider();

export const signIn_popup = async (provider) => {
  return await signInWithPopup(authService, provider);
};

export const logOut = () => signOut(authService);

export const dbService = getFirestore();

export const addNweet = async (nweet, uid) => {
  await addDoc(collection(dbService, 'nweets'), {
    text: nweet,
    createAt: serverTimestamp(),
    creatorId: uid,
  });
};

export const get_nweets = async () => {
  const dbQuery = query(collection(dbService, 'nweets'));
  return await getDocs(dbQuery);
};

export const onSnapShot = (func) => {
  const dbQuery = query(
    collection(dbService, 'nweets'),
    orderBy('createAt', 'desc'),
  );
  onSnapshot(dbQuery, func);
};

const NweetTextRef = (nweetId) => doc(dbService, 'nweets', `${nweetId}`);

export const deleteNweet = (nweetId) => deleteDoc(NweetTextRef(nweetId));
