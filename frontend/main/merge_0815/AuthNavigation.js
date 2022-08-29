import { SignedInStack, SignedOutStack } from "./navigation";
import firebase from "./firebase";
import React, { useState, useEffect } from "react";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userHnadler = user => user ? setCurrentUser(user) : setCurrentUser(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => userHnadler(user));
  }, []);
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;