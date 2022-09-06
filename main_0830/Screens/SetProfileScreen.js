import { View, Text } from "react-native";
import React from "react";
import SetProfile from "../Components/Login/SetProfile";
import SetProfile2 from "../Components/Login/SetProfile2";

const SetProfileScreen = ({ navigation }) => {
  return (
    <View>
      <SetProfile2 navigation={navigation} />
    </View>
  );
};

export default SetProfileScreen;