import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import firebase from "../firebase";

const db = firebase.firestore();
const window = Dimensions.get("screen");

export default function NotificationScreen({ navigation }) {
  let today = new Date();
  let month = today.getMonth();
  let date = today.getDate();
  const [likes, setLikes] = useState([]);
  const usersCollection = firebase.firestore().collection("users");
  const currentUserEmail = firebase.auth().currentUser.email;
  const postCollection = usersCollection
    .doc(currentUserEmail)
    .collection("posts");

  const getLikes = () => {
    postCollection.onSnapshot((snapshot) => {
      setLikes(
        snapshot.docs.map((post) => ({
          id: post.id,
          caption: post.data()["caption"],
          likes_By_Users: post.data()["likes_by_users"],
          user_profiles: '',
          cnt: post.data()["likes_by_users"].length,
          thumbnailImage: post.data().imageArray[0],
        }))
      );
    });
  };

  useEffect(() => {
    getLikes();
  }, [postCollection]);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        {item.cnt === 0 ? null : (
          <View style={{ flexDirection: "row" }}>
            {/* <Text>{item.caption}이 좋아요를 받았습니다.</Text> */}
            <Image
              style={styles.image}
              source={{uri : item.thumbnailImage}}
            />
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.text}>게시글이 좋아요를 받았습니다.</Text>
                <Text style={styles.text}>좋아요 수: {item.cnt}</Text>
              </View>
              <Text style={styles.date}>
                {month}월 {date}일
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={likes} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: window.width * 0.7,
    height: window.width * 0.16 * 1.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    margin: 3,
  },
  image: {
    width: window.width * 0.16,
    height: window.width * 0.16 * 1.2,
    alignItems: "flex-start",
    marginRight: 20,
    // backgroundColor: "red",
  },
  date: {
    color: "#444",
  },
});
