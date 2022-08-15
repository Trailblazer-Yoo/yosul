import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: "https://img.icons8.com/material-outlined/24/FFFFFF/like--v1.png",
    LikedImageUrl: "https://img.icons8.com/ios-glyphs/30/000000/like--v1.png",
  },
  {
    name: "Comment",
    imageUrl:
      "https://img.icons8.com/material-outlined/24/FFFFFF/filled-topic.png",
  },
  {
    name: "Share",
    imageUrl: "https://img.icons8.com/ios-glyphs/30/FFFFFF/filled-sent.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/windows/32/FFFFFF/bookmark-ribbon--v1.png",
  },
];

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>

    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 350,
    }}
  >
    <Image
      source={{ uri: post.imgurl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = () => (
  <View style={{ flexDirection: "row" }}>
    <View style={styles.leftFooterIconContainer}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl} />
    </View>

    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes.toLocaleString("en")}{" "}
      {post.likes.toLocaleString("en").length > 1 ? "likes" : "like"}
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user} </Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View {post.comments.length > 1 ? "all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>
          {"  "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});

export default Post;
