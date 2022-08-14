import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button
} from 'react-native'
import Dictionary from './Screen/Dictionary';
import Screen02 from './Screen/Screen02';
import Home from './Screen/Home';
import SNS from './Screen/SNS';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Top_Tab = createMaterialTopTabNavigator();


function HomeScreen({navigation}) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={Home}
        />
        <Tab.Screen
          name='SNS'
          component={SNS}
        />
        <Tab.Screen
          name="Dictionary"
          component={Dictionary}
        />
        <Tab.Screen
          name="Setting"
          component={Screen02}
          options={{headerRight:((navigation)=><Button title='fix'/>)}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
