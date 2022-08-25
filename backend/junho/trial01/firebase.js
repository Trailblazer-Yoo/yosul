import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyDzPzyP2mZLEPjoLkYWEiuNUBSiLbwaMZc",
//   authDomain: "ios-tester000.firebaseapp.com",
//   projectId: "ios-tester000",
//   storageBucket: "ios-tester000.appspot.com",
//   messagingSenderId: "395090717958",
//   appId: "1:395090717958:web:cc874a7b8d3edb03f24287"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA4i8mfNp2O_AXOfEzH3IqziXVJqD3stYs",
  authDomain: "ios-teter.firebaseapp.com",
  projectId: "ios-teter",
  storageBucket: "ios-teter.appspot.com",
  messagingSenderId: "1086202831260",
  appId: "1:1086202831260:web:89b3a4bc6a97dfc030e859"
};

// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

// console.log('database length')
// console.log(firebase.apps.length)

const firestoreApp = firebase.initializeApp(firebaseConfig)
export default firestoreApp.firestore();