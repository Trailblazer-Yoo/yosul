import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import LoginForm from "../Components/Login/LoginForm";


export function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo2.png")} />
      </View>
      <LoginForm navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default LoginScreen;