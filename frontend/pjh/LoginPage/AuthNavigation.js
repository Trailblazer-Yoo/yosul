import React, { useEffect, useState } from "react";
import SignedInStack, { SignedOutStack } from "./navigation";
import { firebase } from "firebase";

const AuthNavigation = () => {
  const [currnetUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => useGestureHandlerRef(user));
  }, []);
  return <>{currnetUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
