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

const HeartIcon = () => {
  return (
    <TouchableOpacity>
      {/* heart / heart-fill */}
      <Octicons name="heart" size={27} color="gray" />
    </TouchableOpacity>
  );
};

export default HeartIcon;
