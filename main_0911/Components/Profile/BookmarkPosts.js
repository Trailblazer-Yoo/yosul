import React from "react";
import {
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

const window = Dimensions.get('screen')

const BookmarkPosts = ({ posts, index, navigation }) => {
  return (
    <View style={{ flex: 1 / 2, marginBottom: 0 }}>
      <Pressable
        style={{ flex: 1, width: window.width * 0.49, height: window.width * 0.49 * 1.41, marginTop: 3 }}
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
      width: window.width * 0.49,
      height: window.width * 0.49 * 1.41,
      borderRadius: 10,
    }}
    source={{
      uri: posts.imageArray[0],
    }}
  />
);

export default BookmarkPosts;
