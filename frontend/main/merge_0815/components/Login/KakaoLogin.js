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
import { WebView } from "react-native-webview";

const KakaoLogin = ({navigation, route}) => {
  const REST_API_KEY = "9d08dcb567b26fea503158a467b0f216";
  const REDIRECT_URI = "http://localhost:19000";

  const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
  const getCode = () => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}

export default KakaoLogin;
