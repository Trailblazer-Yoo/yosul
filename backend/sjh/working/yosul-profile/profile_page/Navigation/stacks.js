import React from "react";
import { createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import profileMainScreen from "../Screen/Profile/profileMainScreen";
import profileScreen from "../Screen/Profile/profileScreen";
import Tabs from "./tabs";


const Stack = createStackNavigator();

export default function HomeStack () {
  return(
    <NavigationContainer>
      <Stack.Navigator InitialRouteName="profileMainScreen">
      <Stack.Screen 
        name="나의 프로필" 
        component={profileScreen}
        options={{headerShown: true, animationEnabled: true}} 
        />
      <Stack.Screen 
        name="프로필 편집" 
        component={profileMainScreen}
        options={{headerShown: true, animationEnabled: true}} 
        />
      <Stack.Screen name ='Tabs'options={{headerShown:true}} component={Tabs}/>
      </Stack.Navigator>
    </NavigationContainer>
     )
  }
