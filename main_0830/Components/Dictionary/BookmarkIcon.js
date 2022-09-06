import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";

const BookmarkIcon = () => {
  return (
    <TouchableOpacity style={{ marginBottom: 2 }}>
      {/* star / star-fill */}
      <Octicons name="star" size={27} color="gray" />
    </TouchableOpacity>
  );
};

export default BookmarkIcon;
