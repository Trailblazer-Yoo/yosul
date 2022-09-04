// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCdFg4S9H1RN-fbNrUk_X0snJX-gg4Duc",
  authDomain: "yosul-f2107.firebaseapp.com",
  projectId: "yosul-f2107",
  storageBucket: "yosul-f2107.appspot.com",
  messagingSenderId: "1033895981364",
  appId: "1:1033895981364:web:e19637699b552888fef561"
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase