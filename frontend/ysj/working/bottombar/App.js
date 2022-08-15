import * as React from "react";
import { Text, View, StatusBar, useWindowDimensions } from "react-native";
import Constants from 'expo-constants';
import { NavigationContainer } from "@react-navigation/native";
import { TabView, SceneMap } from 'react-native-tab-view';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  FontAwesome5,
} from "@expo/vector-icons";

import { DictionaryMain } from "./dictionary/DictionaryMain"
import { Color } from "./design";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'black' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>넣을 화면</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third'}
  ]);
  
  return (
    <NavigationContainer>
      <TabView style={{paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight}}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />

      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: Color.main,
          tabBarInactiveTintColor: "grey",
          tabBarShowLabel:true, // 탭 아래 글씨 나오게 할지 선택
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "홈",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home"
                style={{
                  color: focused ? Color.main : "grey",
                  fontSize: focused ? 36 : 29,
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Community"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "커뮤니티",
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="users"
                style={{
                  color: focused ? Color.main : "grey",
                  fontSize: focused ? 30 : 23,
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Map"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "지도",
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="map-marker-radius"
                style={{
                  color: focused ? Color.main : "grey",
                  fontSize: focused ? 36 : 29,
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Dictionary"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "사전",
            tabBarIcon: ({ focused }) => (
              <Foundation
                name="book-bookmark"
                style={{
                  color: focused ? Color.main : "grey",
                  fontSize: focused ? 33 : 26,
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: "프로필",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-circle-sharp"
                style={{
                  color: focused ? Color.main : "grey",
                  fontSize: focused ? 35 : 28,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
