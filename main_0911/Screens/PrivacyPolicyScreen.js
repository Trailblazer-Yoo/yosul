import { View, Text } from "react-native";
import React from "react";
import PrivacyPolicy from "../Components/Login/PrivacyPolicy";

const PrivacyPolicyScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <PrivacyPolicy navigation={navigation} />
    </View>
  );
};

export default PrivacyPolicyScreen;
