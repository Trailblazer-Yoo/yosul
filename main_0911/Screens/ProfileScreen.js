import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import MyDrinks from "../Components/Profile/MyDrinks";
import Posts from "../Components/Profile/Posts";
import UserProfile from "../Components/Profile/UserProfile";
import MyBookmarkPosts from "../Components/Profile/MyBookmarkPosts";
import firebase from "../firebase";

const Tab = createMaterialTopTabNavigator();
const db = firebase.firestore();

const ProfileScreen = ({ navigation }) => {
  const [loading2, setLoading2] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [bookmarkPosts, setBookmarkPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [soolList, setSoolList] = useState([]);

  // UserProfile 및 기본 정보 데이터 (param : userInfo)
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", firebase.auth().currentUser.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setUserInfo(doc.data());
        })
      );
    return unsubscribe;
  }, []);

  // 내가 쓴 글에 들어갈 데이터 (params : posts)
  useEffect(() => {
    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      // .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
        );
      });
  }, []);

  // 찜한 전통주에 들어갈 데이터 (params : sulList)
  const getSoolDocs = async () => {
    const dataSnapShot = (
      await db.collection("global").doc("drinks").get()
    ).data();
    setSoolList(dataSnapShot);
  };

  useEffect(() => {
    getSoolDocs();
  }, []);

  const getBookmarksPosts = async () => {
    const dataSnapShot = (
      await db.collection("users").doc(firebase.auth().currentUser.email).get()
    ).data();

    var bookmarkdata = dataSnapShot["myBookmarksPosts"];
    const data = [];
    for (let i = 0; i < bookmarkdata.length; i++) {
      Object.entries(bookmarkdata[i]).map(async ([email, postid]) => {
        // console.log(email, postid)
        const tmp = (await db.collection("users").doc(email).collection('posts').doc(postid).get()).data()
        data.push({id:postid, ...tmp})
      });
    }
    setBookmarkPosts(data)
  };

  // setLoading2(false);
  useEffect(() => {
    getBookmarksPosts();
    setLoading2(false)
  }, []);

  // 내가 쓴 글에 들어갈 컴포넌트
  const MyPostsStack = () => {
    const renderPosts = (itemData) => {
      return (
        <Posts
          posts={itemData.item}
          index={itemData.id}
          navigation={navigation}
        />
      );
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={posts}
          renderItem={renderPosts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{ margin: 3 }}
        />
      </SafeAreaView>
    );
  };

  // 게시물 다시보기에 들어갈 컴포넌트
  const BookmarkPostsStack = () =>{
    const renderPosts = (itemData) => {
      return (
        <Posts
          posts={itemData.item}
          index={itemData.id}
          navigation={navigation}
        />
      );
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={bookmarkPosts}
          renderItem={renderPosts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{ margin: 3 }}
        />
      </SafeAreaView>
    );
  };

  // 찜한 전통주에 들어갈 컴포넌트
  const MyDrinksStack = () => {
    return (
      <MyDrinks
        mydrinks={userInfo.myBookmarkDrinks}
        soolList={soolList}
        currentUserEmail={firebase.auth().currentUser.email}
        navigation={navigation}
      />
    );
  };

  // firebase storage에서 데이터를 매우 많이 불러오므로 이 페이지로 component 우선 사용
  const HomeScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>넣을 화면</Text>
      </View>
    );
  };
  // console.log(userInfo);

  return (
    <View style={styles.containertop}>
      <UserProfile userInfo={userInfo} navigation={navigation} />
      <Tab.Navigator screenOptions={() => screenOptions}>
        {/* firebase storage에서 데이터를 매우 많이 불러오므로 HomeScreen으로 component 우선 사용 */}
        <Tab.Screen
          name="내가 쓴 글"
          component={HomeScreen} // MyPostsStack
          navigation={navigation}
        />
        <Tab.Screen
          name="게시물 다시보기"
          component={HomeScreen} // BookmarkPostsStack
          navigation={navigation}
        />
        <Tab.Screen
          name="찜한 전통주"
          component={HomeScreen} // MyDrinksStack
          navigation={navigation}
        />
      </Tab.Navigator>
      {loading2 === true ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color="#C0E8E0"
            size="large"
            style={{ opacity: 1.5 }}
          />
        </View>
      ) : (
        <></>
      )}
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
};

const styles = StyleSheet.create({
  containertop: {
    paddingTop:
      Platform.OS === "ios"
        ? getStatusBarHeight(true)
        : StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.3,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
