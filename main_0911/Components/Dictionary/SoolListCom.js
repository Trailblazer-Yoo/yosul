import {
  Text,
  Pressable,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import React from "react";

const SoolListCom = ({ item, index, navigation }) => {
  const imageArray = {
    "0": require("../../assets/soolType/0.jpg"),
    "1": require("../../assets/soolType/1.jpg"),
    "2": require("../../assets/soolType/2.jpg"),
    "3": require("../../assets/soolType/3.jpg"),
    "4": require("../../assets/soolType/4.jpg"),
  }

  return (
    <Pressable
      style={styles.listContainer}
      onPress={() =>
        navigation.push("DictionaryDetailScreen", { id: index, item: item })
      }
    >
      {item.typeCode === 'undefined' ? null : (
        <Image style={styles.img} source={imageArray[item.typeCode]} />
      )}
      <View>
        <Text style={styles.name}>{item.soolName}</Text>
        <Text style={styles.text}>
          지역 :{" "}
          {item.breweryAddress.substr(
            0,
            item.breweryAddress.indexOf(
              " ",
              item.breweryAddress.indexOf(" ") + 1
            )
          )}
        </Text>
        <Text style={styles.text}>도수 :{item.soolAlcohol}</Text>
        <Text style={styles.text}>분류 : {item.soolType}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    color: "grey",
    backgroundColor: "white",
  },
  img: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").width / 5,
    resizeMode: "contain",
    borderColor: "#C0E8E0",
    borderRadius: 20,
    marginRight: 20,
    borderWidth: 1,
  },
  name: {
    color: "black",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 3,
    marginTop: 3,
  },
  text: {
    color: "black",
    fontSize: 15,
    marginBottom: 1,
  },
});

export default SoolListCom;
