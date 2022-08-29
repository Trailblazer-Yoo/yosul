import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  FontAwesome5,
  Octicons,
  MaterialIcons,
  Entypo
} from "@expo/vector-icons";

import UploadPostScreen from "./UploadPostScreen";
import DictionaryScreen from "./DictionaryScreen";
import ProfileScreen from "./ProfileScreen";
import CommunityScreen from "./CommunityScreen";
import HomeScreen from "./HomeScreen";
import UploadPost from "../Components/UploadPost/UploadPost";
import SearchBar from "../Components/UploadPost/SearchBar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // creates object for Stack Navigator
const screenOptions = {
  headerShown: false,
};

const HomeScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
const CommunityScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
    </Stack.Navigator>
  );
};
const UploadPostScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerBackTitleVisible: true,
      headerBackTitle: '뒤로',
      headerTitleStyle: {color: 'black',fontsize: 10},
      headerTintColor: 'gray',
      headerBackImage: () => { // 뒤로가기 버튼 만들기
        const style = {
            marginLeft: Platform.OS === 'ios' ? 0 : 0,
        };
        return (
            <Entypo
                name = 'chevron-small-left'
                size = {30}
                color = 'gray'
                style = {style}
            />             
        );
      }
    }}>
      <Stack.Screen name="UploadPostScreen" component={UploadPostScreen} options={{headerTitle: '글 작성'}}/>
      <Stack.Screen name="UploadPost" component={UploadPost} />
      <Stack.Screen name="SearchBar" component={SearchBar} options={{headerTitle: '태그 설정'}}/>
    </Stack.Navigator>
  );
};
const DictionaryScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="DictionaryScreen" component={DictionaryScreen} />
    </Stack.Navigator>
  );
};
const ProfileScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: styles.maincolor, // 아래 탭 클릭시 색깔 변경
        tabBarShowLabel: true, // 탭 아래 글씨 나오게 할지 선택
        tabBarInactiveTintColor: "grey", // 아래 탭 클릭 안할 시에 색깔 변경
        headerBackTitleVisible: true, // 뒤로가기 버튼 출력
        headerBackTitle: '뒤로', // 뒤로가기 텍스트 변경
        headerTitleAlign: 'center', // 헤더 가운데 정렬
        headerTitleStyle: { fontsize: 10},
        swipeEnabled: false,
        adaptive: true,
        headerTintColor: '#000000',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeScreenStack}
        options={{
          tabBarLabel: "홈",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              style={{
                color: focused ? styles.maincolor : "grey",
                fontSize: focused ? 36 : 29,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="CommunityStack"
        component={CommunityScreenStack}
        options={{
          headerShown: true,
          tabBarLabel: "커뮤니티",
          headerTitle: '커뮤니티',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="users"
              style={{
                color: focused ? styles.maincolor : "grey",
                fontSize: focused ? 30 : 23,
              }}
            />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ paddingRight: 30 }}
                // onPress={() => navigation.push('NewPostScreen')}
              >
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>11</Text>
                </View>
                <Octicons name="bell-fill" size={24} color="black" />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tab.Screen
        name="UploadPostStack"
        component={UploadPostScreenStack}
        options={{
          headerShown: false,
          tabBarLabel: "글 작성",
          headerTitle: '글 작성',
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="camera-alt"
              style={{
                color: focused ? styles.maincolor : "grey",
                fontSize: focused ? 32 : 25,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DictionaryStack"
        component={DictionaryScreenStack}
        options={{
          headerShown: true,
          tabBarLabel: "사전",
          headerTitle: '전통주 사전',
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="book-bookmark"
              style={{
                color: focused ? styles.maincolor : "grey",
                fontSize: focused ? 33 : 26,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileScreenStack}
        options={{
          headerShown: false,
          tabBarLabel: "프로필",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle-sharp"
              style={{
                color: focused ? styles.maincolor : "grey",
                fontSize: focused ? 35 : 28,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  maincolor: "#C0E8E0",
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 10,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});

export default BottomTabs;
