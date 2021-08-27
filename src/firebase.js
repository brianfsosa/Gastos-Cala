import firebase from 'firebase/app'
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyCGL-iPM0GS8XGSAuyRR5uSFcJ4nOiBXGY",
    authDomain: "gastos-44ae5.firebaseapp.com",
    projectId: "gastos-44ae5",
    storageBucket: "gastos-44ae5.appspot.com",
    messagingSenderId: "941229313467",
    appId: "1:941229313467:web:3baf4e90787e01d80c489e",
    measurementId: "G-FD0JRGTLYV"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();