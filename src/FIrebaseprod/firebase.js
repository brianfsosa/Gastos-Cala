import firebase from 'firebase/app'
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyCl5cIXdUtsMwz-1plPJ2hFmgHDFQaeKzE",
    authDomain: "gastos-midnight.firebaseapp.com",
    projectId: "gastos-midnight",
    storageBucket: "gastos-midnight.appspot.com",
    messagingSenderId: "296027626747",
    appId: "1:296027626747:web:351414d2a9ecd93507245e"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();