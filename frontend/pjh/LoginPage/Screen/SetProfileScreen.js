import { View, Text } from "react-native";
import React from "react";
import SetProfile from "../Component/login/SetProfile";

const SetProfileScreen = ({ navigation }) => {
  return (
    <View>
      <SetProfile navigation={navigation} />
    </View>
  );
};

export default SetProfileScreen;