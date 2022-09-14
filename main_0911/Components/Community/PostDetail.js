import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore();
const window = Dimensions.get("window");
const width = window.width * 0.49;
const height = window.width * 0.49 * 1.41;

const PostDetail = ({ route }) => {
  const [post, setPost] = useState(route.params.item);
  const [myInfo, setMyInfo] = useState(
    db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .onSnapshot((snapshot) => myInfo.push(snapshot.data()))
  );
  console.log("포스트", post);
  console.log(post.imageArray);

  commentHandleLike = () => {
    db.collection("users").doc(post.email).collection(post.id).update({
      comments: firebase.firestore.FieldValue.arrayUnion(),
    });
  };

  return (
    <ScrollView style={styles.postContainer}>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <PostHeader post={post} />
        <PostDate post={post} />
      </View>
      <Image
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        source={{ uri: post.imageArray[1] }}
      />

      <PostImage post={post} />
      <LikesOthers post={post} />
      <PostTag post={post} />
      <PostCaption post={post} />
      <PostComments post={post} />
      <CommentWrite post={post} commentHandleLike={commentHandleLike} />
      {/* 하트랑 북마크 등 */}
      <View style={styles.postOptionsContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            {/* <Ionicons
              name={post.likes_by_users.includes(post.eamil) ? "heart" : "heart-outline"}
              size={27}
              color={props.post.liked ? "#FF3E3E" : "black"}
              style={{ marginRight: 10 }}
            /> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <FontAwesome name="bookmark-o" size={25} style={{ marginRight: 5 }} />
        </TouchableOpacity>
      </View>
      {/* 좋아요 수 */}
      {/* 댓글 */}
      {/* 시간 */}
      {/* 댓글 작성 */}
    </ScrollView>
  );
};

const PostHeader = ({ post }) => (
  <View style={styles.postUserData}>
    <TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: post.profile_picture }}
          style={{ width: 30, height: 30 }}
          borderRadius={50}
        />
        <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 10 }}>
          {post.nickname}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const PostDate = ({ post }) => {
  const date = new Date(post.createdAt.seconds * 1000);
  return (
    <Text
      style={{
        fontSize: 12,
        color: "#777",
        fontWeight: "500",
        marginLeft: 15,
        marginTop: 5,
      }}
    >
      {date.getMonth()}.{date.getDate()}
    </Text>
  );
};

const PostImage = ({ post }) => {
  return (
    <View
    // style={{ width: width, height: height }}
    >
      <Text>플랫리스트</Text>
      <FlatList
        data={post.imageArray}
        horizontal={true}
        keyExtractor={(_, index) => index.toString()}
        // showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              <Image
                source={{ uri: item }}
                style={{
                  resizeMode: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          );
        }}
      />
      <Text>플랫리스트</Text>
    </View>
  );
};

const LikesOthers = ({ post }) => (
  <TouchableOpacity style={styles.likesViewContainer}>
    <Text style={{ fontSize: 14, marginLeft: 5 }}>
      {post.likes_by_users.length} Liked by{" "}
      <Text style={{ fontWeight: "700" }}>
        {post.likes_by_users[0]} and others
      </Text>
    </Text>
  </TouchableOpacity>
);

const PostCaption = ({ post }) => (
  <View style={{ marginLeft: 10, marginTop: window.width * 0.03 }}>
    <Text>
      <Text style={{ fontWeight: "bold" }}>{post.nickname} </Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const PostComments = ({ post }) => (
  <View style={styles.commentsContainer}>
    <Text>코멘트</Text>
    {post.comments.map((comment) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Text style={{ fontWeight: "700" }}>{comment.username}</Text>
          <Text style={{ marginLeft: 5 }}>{comment.comment}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const PostTag = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 2,
      marginLeft: 10,
      width: window.width,
    }}
  >
    {post.tags.map((tag, index) => (
      <View
        key={index}
        style={{
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ color: "black" }}>
            <Text
              style={{
                backgroundColor: "#c0e8e0",
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

const CommentWrite = ({ post, commentHandleLike }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 10 }}>
      <Image
        source={{ uri: post.profile_picture }}
        style={{
          width: window.width * 0.06,
          height: window.width * 0.06,
          borderRadius: 50,
          padding: 5,
        }}
      />
      <TextInput
        style={{ paddingLeft: 10 }}
        placeholder="댓글을 입력해주세요"
      />
      <TouchableOpacity style={styles.buttonDesign}>
        <Text
          style={{
            fontSize: 10,
          }}
        >
          추가
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  postUserData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    height: width * 0.12,
  },
  postOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: width * 0.2,
    marginHorizontal: 10,
  },
  likesViewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20,
  },
  likesPic: {
    width: 20,
    height: 20,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: "white",
  },
  commentsContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
    marginTop: 4,
  },
  buttonDesign: {
    borderRadius: 20,
    backgroundColor: "#c0e8e0",
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetail;
