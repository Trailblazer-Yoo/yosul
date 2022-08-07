import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

function Home({ navigation, route }) {
  const [font, setFont] = useState(false);
  useEffect(() => {
    async function setFont() {
      setFont = await Font.loadAsync({
        Library: require("../assets/fonts/library.ttf"),
      });
    }
    setFont(true);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState([]);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../logo3.png")}></Image>
      <Text style={styles.logoText}>여술램프</Text>
      {/* <View style={styles.loginBox}>
        <Button
          title="카카오 로그인"
          color="#191919"
          onPress={() => navigation.push("Login")}
        ></Button>
      </View> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0E8E0",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 250,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Library",
    marginTop: 20,
    marginBottom: 200,
  },
  loginBox: {
    backgroundColor: "#FEE500",
    flex: 0.8,
    marginTop: 100,
    marginBottom: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    height: 90,
    width: 270,
    paddingBottom: 300,
  },
  loginText: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 200,
  },
});

export default Home;
