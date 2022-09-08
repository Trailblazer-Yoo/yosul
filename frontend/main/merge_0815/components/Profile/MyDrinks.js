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
import firebase from "../../firebase";

const window = Dimensions.get("window");
const db = firebase.firestore();

const MyDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const currentUserEmail = firebase.auth().currentUser.email;

  const getdata = async () => {
    const dataSnapShot = (db
      .collection("users")
      .doc(currentUserEmail)
      .get()).data()
    setDrinks(dataSnapShot);

    //   const dataSnapShot = (await sulCollection.doc("drinks").get()).data();
    //   const data = [];
    //   data.push(Object.values(dataSnapShot));
    //   setSulList(data[0]);
    //   setLoading(true)
  }
  console.log(drinks.MyDrinks)

  const renderView = ({ item }) => {
    return (
      <Pressable>
        <Image style={styles.imgstyle} source={{ uri: item.imageArray[0] }} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text>안녕하세요</Text>
      {/* <FlatList
        data={posts}
        style={styles.wrapper}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        horizontal={false} // numColumn을 설정하기 위해서 horizontal=false설정
        renderItem={renderView}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 1,
    justifyContent: "center",
  },
});
export default MyDrinks;
