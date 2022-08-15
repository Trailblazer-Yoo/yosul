import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screen/LoginScreen";
import Home from "./Component/Home";
import SignupScreen from "./Screen/SignupScreen";
import SignedInStack from "./navigation";
import SetProfileScreen from "./Screen/SetProfileScreen";
// import AuthNavigation from "./AuthNavigation";

export default function App() {
  return <SignedInStack />;
}
