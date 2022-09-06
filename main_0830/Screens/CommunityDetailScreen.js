import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import PostDetailScreen from "../Components/Community/PostDetailScreen";

export function CommunityDetailScreen({navigation}) {
  return (
    <View style={styles.container}>
      <PostDetailScreen navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 2,
    paddingHorizontal: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default CommunityDetailScreen;