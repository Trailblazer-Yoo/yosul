import { View, Text } from "react-native";
import React from "react";
import SetProfile from "../Component/SetProfile";
import SetProfile2 from "../Component/SetProfile2";

const SetProfileScreen = ({ navigation }) => {
  return (
    <View>
      <SetProfile2 navigation={navigation} />
    </View>
  );
};

export default SetProfileScreen;