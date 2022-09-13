import { Text, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore();

const HeartIcon = ({ item, currentUserEmail, screenState }) => {
  const [currentLikesStatus, setcurrentLikesStatus] = useState(
    !item.likesByUsers.includes(currentUserEmail)
  );
  const [currentLength, setCurrentLength] = useState(item.likesByUsers.length);

  const handleLike = () => {
    const update_dict = {};
    const update_mine = {};
    if (currentLikesStatus) {
      update_dict[`${item.soolName}.likesByUsers`] =
        firebase.firestore.FieldValue.arrayUnion(currentUserEmail);
      update_mine["myLikesDrinks"] = firebase.firestore.FieldValue.arrayUnion(
        item.soolName
      );
      setCurrentLength(currentLength + 1);
    } else {
      update_dict[`${item.soolName}.likesByUsers`] =
        firebase.firestore.FieldValue.arrayRemove(currentUserEmail);
      update_mine["myLikesDrinks"] = firebase.firestore.FieldValue.arrayRemove(
        item.soolName
      );
      setCurrentLength(currentLength - 1);
    }
    db.collection("global").doc("drinks").update(update_dict);
    setcurrentLikesStatus(!currentLikesStatus);
    db.collection("users").doc(currentUserEmail).update(update_mine);
  };

  return (
    <Pressable onPress={handleLike}>
      <View
        style={{
          alignItems: "center",
          flexDirection: screenState ? "row" : "column",
        }}
      >
        {currentLikesStatus ? (
          <Octicons name="heart" size={25} color="gray" />
        ) : (
          <Octicons name="heart-fill" size={25} color="red" />
        )}
        <Text
        style={{marginLeft: screenState ? 15 : 0,
        fontSize:16}}
        >{currentLength.toString()}</Text>
      </View>
    </Pressable>
  );
};

export default HeartIcon;
