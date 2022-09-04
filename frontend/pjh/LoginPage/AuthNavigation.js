import React, { useEffect, useState } from "react";
import SignedInStack, { SignedOutStack } from "./navigation";
import firebase from "firebase";

const AuthNavigation = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  const [currnetUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => userHandler(user)),
    []
  );
  return <>{currnetUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
