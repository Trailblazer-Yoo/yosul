import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar, Text, View, StyleSheet } from "react-native";
import MyDrinks from "../Components/Profile/MyDrinks";
import MyPosts from '../Components/Profile/MyPost'
import UserProfile from '../Components/Profile/UserProfile'
import firebase from "../firebase";

const Tab = createMaterialTopTabNavigator();
const db = firebase.firestore();

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [sulList, setSulList] = useState([]);
  const [posts, setPosts] = useState([])
  
  // UserProfile 및 기본 정보 데이터 (param : userInfo)
  useEffect (() => {
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", firebase.auth().currentUser.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setUserInfo(doc.data());
        })
      );
    return unsubscribe
  }, [])

  // 내가 쓴 글에 들어갈 데이터 (params : posts)
  useEffect(() => {
    db.collection('users')
    .doc(firebase.auth().currentUser.email)
    .collection('posts')
    // .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, [])

  // 찜한 전통주에 들어갈 데이터 (params : sulList)
  const getSoolDocs = async () => {
    const dataSnapShot = (
      await db.collection("global").doc("drinks").get()
    ).data();
    setSulList(dataSnapShot);
  };

  useEffect(() => {
    getSoolDocs();
  }, []);

  // 내가 쓴 글에 들어갈 컴포넌트
  const MyPostsStack = () => {
    return <MyPosts posts={posts}/>;
  };

  // 게시물 다시보기에 들어갈 컴포넌트
  const HomeScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>넣을 화면</Text>
      </View>
    );
  };

  // 찜한 전통주에 들어갈 컴포넌트
  const MyDrinksStack = () => {
    return <MyDrinks mydrinks={userInfo.myDrinks} sulList={sulList} currentUserEmail={firebase.auth().currentUser.email} />;
  };

  return (
    <View style={styles.containertop}>
      <UserProfile userInfo={userInfo} navigation={navigation} />
      <Tab.Navigator
        screenOptions={() => screenOptions}
      >
        <Tab.Screen name="내가 쓴 글" component={MyPostsStack} navigation={navigation}/>
        <Tab.Screen name="게시물 다시보기" component={HomeScreen} navigation={navigation}/>
        <Tab.Screen name="찜한 전통주" component={MyDrinksStack} navigation={navigation}/>
      </Tab.Navigator>
    </View>
  );
};

const screenOptions = {
  tabBarActiveTintColor: "black",
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
}

const styles = StyleSheet.create({
  containertop: {
    paddingTop:
      Platform.OS === "ios"
        ? getStatusBarHeight(true)
        : StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
  },
});

export default ProfileScreen;
