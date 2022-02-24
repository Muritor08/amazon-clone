// import firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4kuKR4giiEM8hw80JLS_tAEsRbs4XlLg",
    authDomain: "clone-c378e.firebaseapp.com",
    projectId: "clone-c378e",
    storageBucket: "clone-c378e.appspot.com",
    messagingSenderId: "22326978633",
    appId: "1:22326978633:web:26ee22c79b3d018686b798",
    measurementId: "G-64RKZKMN8M"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };