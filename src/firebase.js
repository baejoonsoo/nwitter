import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCkWsYAjo3DpfYS7S_vI1L08SHI1yp5110',
  authDomain: 'nwitter-4b947.firebaseapp.com',
  projectId: 'nwitter-4b947',
  storageBucket: 'nwitter-4b947.appspot.com',
  messagingSenderId: '903794381615',
  appId: '1:903794381615:web:49c1cae1cc41465d8e47da',
};

export default firebase.initializeApp(firebaseConfig);
