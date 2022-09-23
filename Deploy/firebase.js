import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASAYjykr8YIXU9T6BeQZHm_7TuoKYhc5U",
  authDomain: "yosul-c4fd0.firebaseapp.com",
  projectId: "yosul-c4fd0",
  storageBucket: "yosul-c4fd0.appspot.com",
  messagingSenderId: "433262248708",
  appId: "1:433262248708:web:701948265dfeb2bcbd0651"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
