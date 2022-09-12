import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import {
  AntDesign,
  Feather,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import ImageModal from "react-native-image-modal";
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
        likes_by_users: currentBookmarksStatus
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
      <Divider width={2} orientation="vertical" />
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
        {/* <Caption posts={posts} />
                    <CommentsSection posts={posts} />
                    <Comment posts={posts} /> */}
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
            <Pressable
            // onPress={bookmarkHandleLike(posts)}
            >
              <BookmarkIcon posts={posts} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const PostImage = ({ posts }) => (
  <View style={{ flex: 1, width: "99%", height: 300, marginTop: 3 }}>
    <Image
      style={{
        width: window.width * 0.49,
        height: window.width * 0.69,
        borderRadius: 10,
      }}
      source={{
        uri: posts.imageArray[0],
      }}
    />
  </View>
);

const PostHeader = ({ posts }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
      alignItems: "center",
      width: window.width,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: posts.profile_picture }} style={styles.story} />
      <Text style={{ color: "black", marginLeft: 5, fontWeight: "700" }}>
        {posts.user}
      </Text>
    </View>
  </View>
);

const Tag = ({ posts }) => (
  <View style={{ flexDirection: "row", marginTop: 15 }}>
    {posts.tags.map((tag, index) => (
      <View key={index}>
        <Text style={{ color: "black" }}>
          <Text
            style={{
              backgroundColor: "#c0e8e0",
            }}
          >
            {"#"}
            {tag}
          </Text>
          {"  "}
        </Text>
      </View>
    ))}
  </View>
);

// 내용 어느정도 이상 넘어가면 펼치기로 하기!
// const Caption = ({ posts }) => (
//     <View style={{  width:"100%" }}>
//         <Text style={{ color: 'black' }}>
//             <Text style={{ fontWeight: '600' }}></Text>
//             <Text> {posts.caption}</Text>
//         </Text>
//     </View>
// )

// const CommentsSection = ({ posts }) => (
//     <View style={{ flex:1 , width:"100%" }}>
//         <View style={{ alignItems: 'flex-end', justifyContent: 'center', }}>
//             <Text style ={{marginTop: 5,fontSize: 10}}>{posts.date}</Text>
//         </View>
//         {!!posts.comments.length && (
//             <Text style={{ color: 'gray' }}>
//                 View{posts.comments.length > 1 ? ' all' : ''} {posts.comments.length}{' '}
//                 {posts.comments.length > 1 ? 'comments' : 'comment'}
//             </Text>
//         )}
//     </View>
// )

// const Comment = ({ posts }) => (
//     <>
//         {posts.comments.map((comment, index) => (
//             <View key={index} style={{ flexDirection: 'row', width:"100%" }}>
//                 <Text style={{ color: 'black' }}>
//                     <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
//                     {comment.comment}
//                 </Text>
//             </View>
//         ))}
//     </>
// )

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
    <FontAwesome name="bookmark-o" size={20} color="black" />
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
