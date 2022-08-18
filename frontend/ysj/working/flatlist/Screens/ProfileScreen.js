import React, { useState, useCallback, useRef } from "react";
import Constants from "expo-constants";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CollapsibleHeader from "../components/Profile/Collapsibleheader";
import MyPosts from "../components/Profile/MyPost";

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>넣을 화면</Text>
    </View>
  );
}

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: "#C0E8E0",
          tabBarInactiveTintColor: "grey",
          swipeEnabled: true,
          adaptive: true,
          tabBarIndicatorStyle: {
            backgroundColor: "white",
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "900",
          },
        })}
      >
        <Tab.Screen name="내가 쓴 글" component={MyPosts} />
        <Tab.Screen name="게시물 다시보기" component={HomeScreen} />
        <Tab.Screen name="찜한 전통주" component={HomeScreen} />
      </Tab.Navigator>
      <Animated.View
        style={{
          ...styles.headerContainer,
          transform: [{ translateY: headerTranslateY }],
        }}
        onLayout={headerOnLayout}
        pointerEvents="box-none"
      >
        <CollapsibleHeader />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containertop: {
    paddingTop:
      Platform.OS === "ios"
        ? Constants.statusBarHeight
        : StatusBar.currentHeight,
  },
  container: {
    backgroundColor: "gray",
    flex: 1,
    paddingTop: 50,
  },
  ProfileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
  },
});

export default ProfileScreen;

// import CollapsibleFlatList from "../components/CollapsibleFlatList";

// function CollapsibleTabViewTestScreen(props) {
//   const [headerHeight, setHeaderHeight] = useState(0);

//   const scrollY = useRef(new Animated.Value(0)).current;
//   const headerTranslateY = scrollY.interpolate({
//     inputRange: [0, headerHeight],
//     outputRange: [0, -headerHeight],
//     extrapolate: "clamp",
//   });

//   const headerOnLayout = useCallback((event) => {
//     const { height } = event.nativeEvent.layout;
//     setHeaderHeight(height);
//   }, []);

//   return (
//     <View style={styles.rootContainer}>
//       {headerHeight > 0 ? (
//         <CollapsibleFlatList headerHeight={headerHeight} scrollY={scrollY} />
//       ) : null}

//     </View>
//   );
// }
