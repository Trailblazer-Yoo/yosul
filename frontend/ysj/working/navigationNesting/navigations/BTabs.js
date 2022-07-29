import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  FontAwesome5,
} from "@expo/vector-icons";

import DictionaryScreen from "../Dictionary/dictionaryMain";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>넣을 화면</Text>
    </View>
  );
}

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: Color.main,
        tabBarInactiveTintColor: "grey",
        swipeEnabled: false,
        adaptive: true,
        tabBarShowLabel: true, // 탭 아래 글씨 나오게 할지 선택
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
        component={DictionaryScreen}
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
  );
};

const Color = {
  main: '#C0E8E0'
}

export default BottomTabs