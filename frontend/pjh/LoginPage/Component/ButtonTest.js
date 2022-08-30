import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";


const ButtonTest = () => {
  const alcohols = ["소주", "맥주", "막걸리", "증류식 소주", "와인", "위스키"];
  const [isColor, setColor] = useState("grey");
  const [isSelect, setSelect] = useState([]);


  useEffect(() => {
    setColor(...isSelect)
  }, [])
  const changeButton = (newValue) => {
    isColor === "grey" ? setColor("#C0E8F0") : setColor("grey");
    setSelect([...isSelect, newValue]);
    if (newValue in isSelect) {
      isSelect.splice(newValue, 1);
    }
    console.log(isSelect)
  };

  return (
    <View>
      <TouchableOpacity
        onPress={changeButton}
        style={[styles.buttonContainer, { backgroundColor: isColor }]}
      >
        <Text>{alcohols[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={changeButton}
        style={[styles.buttonContainer, { backgroundColor: isColor }]}
      >
        <Text>{alcohols[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={changeButton}
        style={[styles.buttonContainer, { backgroundColor: isColor }]}
      >
        <Text>{alcohols[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={changeButton}
        style={[styles.buttonContainer, { backgroundColor: isColor }]}
      >
        <Text>{alcohols[3]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={changeButton}
        style={[styles.buttonContainer, { backgroundColor: isColor }]}
      >
        <Text>{alcohols[4]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={changeButton}
        style={[styles.buttonContainer, { backgroundColor: isColor }]}
      >
        <Text>{alcohols[5]}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
  },
});

export default ButtonTest;
