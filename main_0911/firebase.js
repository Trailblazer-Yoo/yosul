import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA4i8mfNp2O_AXOfEzH3IqziXVJqD3stYs",
  authDomain: "ios-teter.firebaseapp.com",
  projectId: "ios-teter",
  storageBucket: "ios-teter.appspot.com",
  messagingSenderId: "1086202831260",
  appId: "1:1086202831260:web:89b3a4bc6a97dfc030e859"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;