import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import firebase from '../../firebase'

const window = Dimensions.get("window");
const db = firebase.firestore()

const MyPosts = ({posts, navigation}) => {

  const renderView = ({ itemData }) => {
    console.log('아이템 데이터',itemData)
    return (
      <Pressable onPress={() => navigation.push("PostDetail", { id: itemData.id, item: itemData.item })}>
        <Image style={styles.imgstyle} source={{uri:itemData.item.imageArray[0]}} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        style={styles.wrapper}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        horizontal={false} // numColumn을 설정하기 위해서 horizontal=false설정
        renderItem={renderView}
      />
    </View>
  );
};

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

export default MyPosts;
