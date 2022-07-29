import * as React from "react";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { TabView, SceneMap } from "react-native-tab-view";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabs from "./navigations/BTabs";
import { Color } from "./design";


export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
