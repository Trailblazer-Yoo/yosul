import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screen/LoginScreen";
import Home from "./Component/Home";
import SignupScreen from "./Screen/SignupScreen";
import SignedInStack, { SignedOutStack } from "./navigation";
import ButtonTest from "./Component/ButtonTest";
import AuthNavigation from "./AuthNavigation";

export default function App() {
  return <AuthNavigation />;
}
