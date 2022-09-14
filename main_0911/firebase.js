import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCbm83Cp4qSZ4b6UDq15Ux6TmsCPncw0TQ",
    authDomain: "yosul-bc7c8.firebaseapp.com",
    projectId: "yosul-bc7c8",
    storageBucket: "yosul-bc7c8.appspot.com",
    messagingSenderId: "160421882753",
    appId: "1:160421882753:web:c4eb0036ff1118f8639680"
  };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
