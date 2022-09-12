import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuzm1YZ58coYo6eZBo6YBxTmFll-48C9Q",
  authDomain: "kakao-test1.firebaseapp.com",
  projectId: "kakao-test1",
  storageBucket: "kakao-test1.appspot.com",
  messagingSenderId: "620521493567",
  appId: "1:620521493567:web:796d95b0b18db81f7e148a",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
