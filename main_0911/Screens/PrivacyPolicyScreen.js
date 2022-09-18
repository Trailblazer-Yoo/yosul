import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <View>
      <WebView
        source={{ uri: "file:///Users/parkjubro/yosul/main_0911/privacy_policy.html" }}
        allowFileAccess={true}
        navigation={navigation}
      />
    </View>
  );
};

export default PrivacyPolicyScreen;
