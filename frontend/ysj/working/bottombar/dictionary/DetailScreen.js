import React from "react";
import { View, Text, StyleSheet } from "react-native";

function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>술사전 상세내용</Text>
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});