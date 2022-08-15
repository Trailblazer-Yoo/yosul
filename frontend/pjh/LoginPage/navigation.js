import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screen/LoginScreen";
import SignupScreen from "./Screen/SignupScreen";
import KakaoLogin from "./Component/KakaoLogin";
import SetProfileScreen from "./Screen/SetProfileScreen";
import PreferredDrinkScreen from "./Screen/PreferredDrinkScreen";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="SetProfileScreen" component={SetProfileScreen} />
      <Stack.Screen
        name="PreferredDrinkScreen"
        component={PreferredDrinkScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default SignedOutStack;
