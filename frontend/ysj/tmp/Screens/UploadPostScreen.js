import React from "react";
import {  View, StyleSheet } from "react-native";
import UploadPost from "../Components/UploadPost/UploadPost";

export function UploadPostScreen({navigation}) {
  return (
    <View style={styles.container}>
      <UploadPost navigation={navigation}/>
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
});

export default UploadPostScreen;