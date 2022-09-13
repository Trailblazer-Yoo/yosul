import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  Feather,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore();
const window = Dimensions.get("window");

const Post = ({ posts, navigation }) => {
  const likesHandleLike = async (posts) => {
    const currentUserEmail = firebase.auth().currentUser.email;
    const myLikePost = {};
    myLikePost[posts.owner_email] = posts.id;
    const currentLikeStatus = !posts.likes_by_users.includes(currentUserEmail);

    db.collection("users")
      .doc(posts.owner_email)
      .collection("posts")
      .doc(posts.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
          : firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
      })
      .catch((error) => {
        console.log("Error updating document", error);
      });

    await db
      .collection("users")
      .doc(currentUserEmail)
      .update({
        myLikesPosts: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(myLikePost)
          : firebase.firestore.FieldValue.arrayRemove(myLikePost),
      notification: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(myLikePost)
          : firebase.firestore.FieldValue.arrayRemove(myLikePost),
      });
  };

  const bookmarkHandleLike = async (posts) => {
    const currentUserEmail = firebase.auth().currentUser.email;
    const myBookmarkPost = {};
    myBookmarkPost[posts.owner_email] = posts.id;
    const currentBookmarksStatus =
      !posts.bookmarks_by_users.includes(currentUserEmail);

    db.collection("users")
      .doc(posts.owner_email)
      .collection("posts")
      .doc(posts.id)
      .update({
        bookmarks_by_users: currentBookmarksStatus
          ? firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
          : firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
      })
      .catch((error) => {
        console.log("Error updating document", error);
      });

    await db
      .collection("users")
      .doc(currentUserEmail)
      .update({
        myBookmarksPosts: currentBookmarksStatus
          ? firebase.firestore.FieldValue.arrayUnion(myBookmarkPost)
          : firebase.firestore.FieldValue.arrayRemove(myBookmarkPost),
      });
  };

  return (
    <View style={{ flex: 1 / 2, marginBottom: 30 }}>
      <Pressable
        onPress={() =>
          navigation.push("PostDetail", { id: posts.id, item: posts })
        }
      >
        <PostImage posts={posts} />
        <PostHeader posts={posts} />
      </Pressable>
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <Tag posts={posts} />
        <View style={styles.FooterIconWrapper}>
          <View style={styles.lefeFooterIconsContainer}>
            <Pressable onPress={() => likesHandleLike(posts)}>
              <HeartIcon posts={posts} />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.push("PostDetail", {
                  id: posts.id,
                  item: posts,
                })
              }
            >
              <CommentIcon posts={posts} />
            </Pressable>
            <Pressable onPress={() => bookmarkHandleLike(posts)}>
              <BookmarkIcon posts={posts} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const PostImage = ({ posts }) => {
  const width = window.width * 0.49;
  const height = window.width * 0.49 * 1.41;
  return (
    <View style={{ flex: 1, width: window.width * 0.49 * 1.45, marginTop: 3 }}>
      <Image
        style={{
          width,
          height,
          borderRadius: 10,
        }}
        source={{
          uri: posts.imageArray[0],
        }}
      />
    </View>
  );
};

const PostHeader = ({ posts }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      alignItems: "center",
      width: window.width * 0.49,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={{ uri: posts.profile_picture }} style={styles.story} />
      <Text style={{ color: "black", marginLeft: 10, fontWeight: "700" }}>
        {posts.user}
      </Text>
    </View>
  </View>
);

const Tag = ({ posts }) => (
  <View
    style={{flexDirection:'row', marginTop: 2, width: window.width * 0.49, flexWrap:'wrap' }}
  >
    {posts.tags.map((tag, index) => (
      <View
        key={index}
        style={{
          // justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ color: "black", flexWrap: "wrap" }}>
            <Text
              style={{
                backgroundColor: "#c0e8e0",
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              {"#"}
              {tag}
            </Text>
            {"  "}
          </Text>
        </View>
      </View>
    ))}
  </View>
);

const HeartIcon = ({ posts }) => (
  <View style={styles.box}>
    {!posts.likes_by_users.includes(firebase.auth().currentUser.email) ? (
      <AntDesign name={"hearto"} size={20} />
    ) : (
      <AntDesign name={"heart"} size={20} color="red" />
    )}

    <Text
      style={{ color: "black", fontWeight: "350", marginLeft: 5, bottom: -2 }}
    >
      {posts.likes_by_users.length.toLocaleString("en")}
    </Text>
  </View>
);

const CommentIcon = ({ posts }) => (
  <View style={styles.box}>
    <SimpleLineIcons name="bubble" size={20} color="black" />
    <Text
      style={{ color: "black", fontWeight: "350", marginLeft: 5, bottom: -2 }}
    >
      {posts.comments.length.toLocaleString("en")}
    </Text>
  </View>
);

const BookmarkIcon = ({ posts }) => (
  <View style={styles.box}>
    {!posts.bookmarks_by_users.includes(firebase.auth().currentUser.email) ? (
      <FontAwesome name="bookmark-o" size={20} color="black" />
    ) : (
      <FontAwesome name="bookmark" size={20} color="yellow" />
    )}
    <Text
      style={{ color: "black", fontWeight: "350", marginLeft: 5, bottom: -2 }}
    >
      {posts.bookmarks_by_users.length.toLocaleString("en")}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  story: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 6,
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  shareIcon: {
    transform: [{ rotate: "320deg" }],
    marginTop: -3,
  },
  FooterIconWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "120%",
    marginTop: 9,
  },
  lefeFooterIconsContainer: {
    flexDirection: "row",
    width: window.width * 0.4,
    justifyContent: "space-between",
  },
  box: {
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
  },
});

export default Post;
