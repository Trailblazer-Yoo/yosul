import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import BottomTabs from "./Screens/BottomTabs";
import KakaoLogin from "./Components/Login/KakaoLogin";
import SetProfileScreen from "./Screens/SetProfileScreen";
import PreferredDrinkScreen from "./Screens/PreferredDrinkScreen";
import { Entypo } from "@expo/vector-icons";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};
const screenOptions2 = {
  headerTitleAlign: "center",
  headerBackTitleVisible: true,
  headerBackTitle: "뒤로",
  headerTitleStyle: { color: "black", fontsize: 10 },
  headerTintColor: "gray",
  headerBackImage: () => {
    // 뒤로가기 버튼 만들기
    const style = {
      marginLeft: Platform.OS === "ios" ? 0 : 0,
    };
    return (
      <Entypo name="chevron-small-left" size={30} color="gray" style={style} />
    );
  },
};

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={({ route }) => {
          if (route.name === "LoginScreen") {
            return screenOptions
          } else {
            return screenOptions2;
          }
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        {/* <Stack.Screen name="KakaoLogin" component={KakaoLogin} /> */}
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerTitle:'회원가입'}} />
        <Stack.Screen name="SetProfileScreen" component={SetProfileScreen} options={{headerTitle:'프로필 설정'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
