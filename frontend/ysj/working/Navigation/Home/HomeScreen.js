import React from "react";
import { Button, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Detail1 열기"
        onPress={() => navigation.push("Detail", {id:1})}
      />
      <Button
        title="Detail2 열기"
        onPress={() => navigation.push("Detail", {id:2})}
      />
      <Button
        title="Detail3 열기"
        onPress={() => navigation.push("Detail", {id:3})}
      />
    </View>
  );
}

export default HomeScreen;
