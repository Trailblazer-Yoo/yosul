import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const window = Dimensions.get("window");

function UserProfile(props) {
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <Image
        style={styles.profileimg}
        source={require("../../assets/chawon.png")}
      />
      <View>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>김채원</Text>
          <Text>수정</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>

        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: window.width,
    height: window.height / 3.5,
    alignItems: "center",
    backgroundColor: "rgba(250,250,250,0.8)",
  },
  headerText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.8)",
  },
  profileimg: {
    marginTop: 35,
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1.6,
    marginBottom: 25,
    borderColor: "black",
  },
});

export default UserProfile;
