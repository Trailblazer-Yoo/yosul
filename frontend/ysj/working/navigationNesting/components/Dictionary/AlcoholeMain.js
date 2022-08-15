import React from "react";
import { Button, View } from "react-native";

function AlcoholList({ navigation }) {
  return (
    <View>
      <Button
        title="Detail1 열기"
        onPress={() => navigation.push()}
      />
      <Button
        title="Detail2 열기"
        onPress={() => navigation.push()}
      />
      <Button
        title="Detail3 열기"
        onPress={() => navigation.push()}
      />
    </View>
  );
}

export default AlcoholList;