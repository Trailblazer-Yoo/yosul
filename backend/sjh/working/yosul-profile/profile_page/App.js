import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Button } from "react-native";
import HomeScreen from "./Screen/HomeScreen";
import CommunityScreen from "./Screen/CommunityScreen";
import MapScreen from "./Screen/MapScreen";
import DictionaryScreen from "./Screen/DictionaryScreen";
import profileScreen from "./Screen/Profile/profileScreen";
import profileMainScreen from "./Screen/Profile/profileMainScreen";
import sulfriends from "./Screen/Profile/sulfriends";
import savedsul from "./Screen/Profile/savedsul";
import { createStackNavigator } from "@react-navigation/stack";
import { Component } from "react";
import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs from './Navigation/tabs';
import HomeStack from './Navigation/stacks';
import Navigator from './Navigation/stacks';
import "react-native-gesture-handler";

const App = () => {
  return(
      <Navigator />
  );
}

export default App;
