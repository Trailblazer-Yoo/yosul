import { Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore();

const BookmarkIcon = ({ item, currentUserEmail }) => {
  const handleLike = ({ item, currentUserEmail }) => {
    const currentBookmarkStatus =
      !item.bookmarksByUsers.includes(currentUserEmail);

    const update_dict = {};
    const update_mine = {};

    db.collection("users")
      .doc(currentUserEmail)
      .update(
        currentBookmarkStatus
          ? (update_dict[`${item.soolName}.bookmarksByUsers`] =
              firebase.firestore.FieldValue.arrayUnion(currentUserEmail))
          : (update_dict[`${item.soolName}.bookmarksByUsers`] =
              firebase.firestore.FieldValue.arrayRemove(currentUserEmail))
      );

    db.collection("global")
      .doc("drinks")
      .update(
        currentBookmarkStatus
          ? (update_mine["myBookmarkDrinks"] =
              firebase.firestore.FieldValue.arrayUnion(item.soolName))
          : (update_mine["myBookmarkDrinks"] =
              firebase.firestore.FieldValue.arrayRemove(item.soolName))
      );
  };

  return (
    <Pressable
      style={{ marginBottom: 2 }}
      onPress={handleLike(item, currentUserEmail)}
    >
      {!item.bookmarksByUsers.includes(currentUserEmail) ? (
        <Octicons name="star" size={27} color="gray" />
      ) : (
        <Octicons name="star-fill" size={27} color="yellow" />
      )}
      <Text>{item.bookmarksByUsers.length.toString()}</Text>
    </Pressable>
  );
};

export default BookmarkIcon;
