import React, { useState, useEffect, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import HeartIcon from "../Dictionary/HeartIcon";
import BookmarkIcon from "../Dictionary/BookmarkIcon";
import SoolListCom from "../Dictionary/SoolListCom";
import firebase from "../../firebase";

const window = Dimensions.get("window");
const db = firebase.firestore();

const MyDrinks = ({ userInfo, soolList, currentUserEmail, navigation }) => {
  const [drinks, setDrinks] = useState([]);
  // console.log("아나시발", userInfo);
  // console.log("내 드링크", userInfo[0]);
  // console.log("슈밟슐발", drinks);

  useEffect(() => {
    const data = [];
    if (userInfo[0] !== undefined) {
      const mydrinks = userInfo[0].myBookmarksDrinks;
      for (var drink of mydrinks) {
        data.push(soolList[drink]);
      }
      setDrinks(data);
    }
  }, []);

  console.log("시발시발시발", drinks);

  // useEffect(() => {
  //   const data = [];
  //   if (userInfo !== undefined) {
  //     const mydrinks = userInfo.myBookmarksDrinks
  //     for (let i = 0; i < mydrinks.length; i++) {
  //       data.push(soolList[mydrinks[i]]);
  //     }
  //   }
  //   setDrinks(data);
  // }, []);

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

  if (
    (drinks === []) |
    (!!drinks.includes(undefined))
  ) {
    return <></>;
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={drinks}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false} // numColumn을 설정하기 위해서 horizontal=false설정
          renderItem={renderListItem}
        />
      </View>
    );
  }
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
  iconcontainer: {
    marginTop: 4,
    alignItems: "center",
  },
});

export default MyDrinks;
