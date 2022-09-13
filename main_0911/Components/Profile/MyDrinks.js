import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import HeartIcon from "../Dictionary/HeartIcon";
import BookmarkIcon from "../Dictionary/BookmarkIcon";
import SoolListCom from "../Dictionary/SoolListCom";
import firebase from "../../firebase";

const window = Dimensions.get("window");
const db = firebase.firestore();

const MyDrinks = ({ userInfo, soolList, currentUserEmail, navigation }) => {
  const [drinks, setDrinks] = useState([]);
  const isFocused = navigation.isFocused();

  useEffect(() => {
    const data = [];
    if (userInfo !== undefined) {
      const mydrinks = userInfo[0].myBookmarksDrinks
      for (let i = 0; i < mydrinks.length; i++) {
        data.push(soolList[mydrinks[i]]);
      }
    }
    setDrinks(data);
  }, [isFocused]);

  const renderListItem = ({ item, index }) => {
    return (
      <View style={styles.flatlistcontainer}>
        <SoolListCom item={item} index={index} navigation={navigation} />
        <View style={styles.iconcontainer}>
          <HeartIcon item={item} currentUserEmail={currentUserEmail} />
          <BookmarkIcon item={item} currentUserEmail={currentUserEmail} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {drinks === [] ? (
        <View>
          <Text>Hello</Text>
        </View>
      ) : (
        <FlatList
          data={drinks}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false} // numColumn을 설정하기 위해서 horizontal=false설정
          renderItem={renderListItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistcontainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: Dimensions.get("window").width - 20,
    height: (Dimensions.get("window").width - 20) / 4,
    padding: 8,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
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
  textcontainer: {
    // flex: 1,
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
  iconcontainer: {
    marginTop: 4,
    alignItems: "center",
  },
});

export default MyDrinks;
