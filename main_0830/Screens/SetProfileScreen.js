import { View, Text } from "react-native";
import React from "react";
import SetProfile from "../Components/Login/SetProfile";

const SetProfileScreen = ({ navigation }) => {
  return (
    <View>
      <SetProfile navigation={navigation} />
    </View>
  );
};

export default SetProfileScreen;