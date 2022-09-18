import { Text, Pressable, View } from "react-native";
import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const db = firebase.firestore();

const BookmarkIcon = ({ item, currentUserEmail, screenState }) => {
  const [currentBookmarkStatus, setcurrentBookmarkStatus] = useState(
    !item.bookmarksByUsers.includes(currentUserEmail)
  );
  const [currentLength, setCurrentLength] = useState(
    item.bookmarksByUsers.length
  );

  const handleLike = () => {
    const update_dict = {};
    const update_mine = {};
    if (currentBookmarkStatus) {
      update_dict[`${item.soolName}.bookmarksByUsers`] =
        firebase.firestore.FieldValue.arrayUnion(currentUserEmail);
      setCurrentLength(currentLength + 1);
      update_mine["myBookmarksDrinks"] =
        firebase.firestore.FieldValue.arrayUnion(item.soolName);
    } else {
      update_dict[`${item.soolName}.bookmarksByUsers`] =
        firebase.firestore.FieldValue.arrayRemove(currentUserEmail);
      update_mine["myBookmarksDrinks"] =
        firebase.firestore.FieldValue.arrayRemove(item.soolName);
      setCurrentLength(currentLength - 1);
    }
    db.collection("global").doc("drinks").update(update_dict);
    setcurrentBookmarkStatus(!currentBookmarkStatus);
    db.collection("users").doc(currentUserEmail).update(update_mine);
  };


  return (
    <Pressable style={{ marginBottom: 2 }} onPress={handleLike}>
      <View
        style={{
          alignItems: "center",
          flexDirection: screenState ? "row" : "column",
        }}
      >
        {currentBookmarkStatus ? (
          <Octicons name="star" size={23} color="gray" />
        ) : (
          <Octicons name="star-fill" size={23} color="yellow" />
        )}
        <Text style={{ marginLeft: screenState ? 15 : 0, fontSize: RFPercentage(1.84) }}>
          {currentLength.toString()}
        </Text>
      </View>
    </Pressable>
  );
};

export default BookmarkIcon;
