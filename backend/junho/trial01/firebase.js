import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCmTBTSH6KBxqOAPiI5RVsjl_phfIY35Hs",
  authDomain: "first-proj-d1f37.firebaseapp.com",
  projectId: "first-proj-d1f37",
  storageBucket: "first-proj-d1f37.appspot.com",
  messagingSenderId: "117964911606",
  appId: "1:117964911606:web:1700c0b42fc57e7b5ecdd7",
  measurementId: "G-709HQQDGSX"
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;