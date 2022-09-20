import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import BookmarkIcon from "../Components/Dictionary/BookmarkIcon";
import HeartIcon from "../Components/Dictionary/HeartIcon";
import SoolListCom from "../Components/Dictionary/SoolListCom";


export default function DictionaryScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [sulList, setSulList] = useState([]);

  const getFsvDocs = async () => {
    const dataSnapShot = (await firebase.firestore().collection("global").doc("drinks").get()).data();
    const data = [];
    data.push(Object.values(dataSnapShot));
    setSulList(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getFsvDocs();
  }, []);

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

  const renderListItem = ({ item, index }) => {
    return (
      <View style={styles.flatlistcontainer}>
        <SoolListCom item={item} index={index} navigation={navigation} />
        <View style={styles.iconcontainer}>
          <HeartIcon
            item={item}
            currentUserEmail={firebase.auth().currentUser.email}
            screenState={false}
          />
          <BookmarkIcon
            item={item}
            currentUserEmail={firebase.auth().currentUser.email}
            screenState={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading === true ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color="grey"
            style={{ marginTop: 10 }}
            size="large"
          />
        </View>
      ) : (
        <FlatList
          data={sulList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderListItem}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
}

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
    width: Dimensions.get("window").width * 0.95,
    height: (Dimensions.get("window").width * 0.95) /4,
    padding: 8,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconcontainer: {
    // marginTop: 3,
    alignItems: "center",
    marginBottom: 1.5,
  },
});
