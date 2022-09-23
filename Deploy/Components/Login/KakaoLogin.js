import React from "react";
import {
  View,
} from "react-native";
import { WebView } from "react-native-webview";

function KakaoLogin({navigation, route}) {
  const REST_API_KEY = "9d08dcb567b26fea503158a467b0f216";
  const REDIRECT_URI = "http://localhost:19000";

  const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
  const getCode = (event) => {
    const exp = "code=";
    const condition = event.indexOf(exp);
    if (condition !== -1) {
      const requestCode = event.substring(condition + exp.length);
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
