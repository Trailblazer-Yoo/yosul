import * as React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SignedInStack, SignedOutStack } from "./navigation";
import AuthNavigation from "./AuthNavigation";

export default function App() {
  return (
    // <SignedOutStack />
    <>
      <AuthNavigation />
      <StatusBar style="auto" />
    </>
  );
}
