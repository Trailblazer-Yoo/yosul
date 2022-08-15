import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import ProfileScreen from "./Screens/ProfileScreen";

export default function App() {
  return (
    <NavigationContainer>
      <ProfileScreen />
    </NavigationContainer>
  );
}