import firebase from 'firebase'

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "",
    authDomain: "react-native-firebase-movil.firebaseapp.com",
    projectId: "react-native-firebase-movil",
    storageBucket: "react-native-firebase-movil.appspot.com",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default {
      firebase,
      db
  };