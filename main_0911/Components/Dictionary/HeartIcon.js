import {
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore();

const HeartIcon = ({ item, currentUserEmail }) => {
  console.log(item)
  const handleLike = ({ item, currentUserEmail }) => {
    const currentLikesStatus =
      !item.likesByUsers.includes(currentUserEmail);

    const update_dict = {};
    const update_mine = {};

    db.collection("users")
      .doc(currentUserEmail)
      .update(
        currentLikesStatus
          ? (update_dict[`${item.soolName}.likessByUsers`] =
              firebase.firestore.FieldValue.arrayUnion(currentUserEmail))
          : (update_dict[`${item.soolName}.likessByUsers`] =
              firebase.firestore.FieldValue.arrayRemove(currentUserEmail))
      );

    db.collection("global")
      .doc("drinks")
      .update(
        currentLikesStatus
          ? (update_mine["myLikesDrinks"] =
              firebase.firestore.FieldValue.arrayUnion(item.soolName))
          : (update_mine["myLikesDrinks"] =
              firebase.firestore.FieldValue.arrayRemove(item.soolName))
      );
  };

  return (
    <Pressable onPress={handleLike(item, currentUserEmail)}>
      {!item.likesByUsers.includes(currentUserEmail) ? (
        <Octicons name="heart" size={27} color="gray" />
      ) : (
        <Octicons name="heart-fill" size={27} color="red" />
      )}
      <Text>{item.likesByUsers.length.toString()}</Text>
    </Pressable>
  );
};

export default HeartIcon;