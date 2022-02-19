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
  updateProfile,
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
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';

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
    ...nweet,
    createAt: serverTimestamp(),
    creatorId: uid,
  });
};

export const deleteAttachment = async (attachmentURL) => {
  await deleteObject(ref(storageService, attachmentURL));
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

export const editNweet = (nweetId, newNweet) =>
  updateDoc(NweetTextRef(nweetId), {
    text: newNweet,
  });

export const storageService = getStorage();

const attachmentRef = (data_url) => ref(storageService, data_url);

export const attachmentUploadString = async (attachment, data_url) =>
  await uploadString(attachmentRef(data_url), attachment, 'data_url');

export const GetDownloadURL = async (ref) => await getDownloadURL(ref);

export const getMyNweets = async (uid) => {
  const Query = query(
    collection(dbService, 'nweets'),
    where('creatorId', '==', uid),
  );

  return await getDocs(Query);
};

export const updateProfileName = async (userObj, newProfile) =>
  await updateProfile(userObj, newProfile);
