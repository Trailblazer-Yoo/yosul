import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import SignupForm from "../Components/Login/SignupForm";
import { ProgressBar } from "react-native-paper";

export function SignupScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo2.png")} />
      </View>
      {/* <ProgressBar progress={10} color="#C0E8E0" /> */}
      <SignupForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default SignupScreen;
