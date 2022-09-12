import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import firebase from "../../firebase";

const window = Dimensions.get("window");
const db = firebase.firestore();

const Posts = ({ posts, index, navigation }) => {
  return (
    <View style={{ flex: 1 / 2, marginBottom: 30 }}>
      <Pressable
        style={{ flex: 1, width: "99%", height: 300, marginTop: 3 }}
        onPress={() =>
          navigation.push("PostDetail", { id: index, item: posts })
        }
      >
        <PostImage posts={posts} />
      </Pressable>
    </View>
  );
};

const PostImage = ({ posts }) => (
  <Image
    style={{
      width: "100%",
      height: 300,
      borderRadius: 10,
    }}
    source={{
      uri: posts.imageArray[0],
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 1,
    justifyContent: "center",
  },
  wrapper: {
    marginHorizontal: 1,
    marginVertical: 1,
    flex: 1,
    display: "flex",
  },
  imgstyle: {
    width: window.width / 2 - 4,
    height: window.width / 1.4,
    borderRadius: 10,
    resizeMode: "cover",
    marginHorizontal: 1,
    marginVertical: 1,
  },
});

export default Posts;
