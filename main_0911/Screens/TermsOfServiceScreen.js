import { View, Text, ScrollView } from "react-native";
import React from "react";
import TermsOfService from "../Components/Login/TermsOfService";

const TermsOfServiceScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TermsOfService navigation={navigation} />
    </ScrollView>
  );
};

export default TermsOfServiceScreen;
