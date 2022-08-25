import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

function KakaoLogin({ navigation, route }) {
  const REST_API_KEY = "9d08dcb567b26fea503158a467b0f216";
  const REDIRECT_URI = "http://192.168.35.71:190000";

  const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
  const getCode = (target) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };
  const requestToken = async (code) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

    const options = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    });

    try {
      const tokenResponse = await axios.post(requestTokenUrl, options);
      const ACCESS_TOKEN = tokenResponse.data.access_token;

      const body = {
        ACCESS_TOKEN,
      };
      const response = await axios.post(REDIRECT_URI, body);
      const value = response.data;
      const result = await storeUser(value);
      if (result === "stored") {
        const user = await getData("user");
        dispatch(read_S(user));
        await navigation.navigate("Main");
      }
    } catch (e) {
      console.log(e);
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
