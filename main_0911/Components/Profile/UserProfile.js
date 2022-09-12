import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import ImageModal from "react-native-image-modal";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import firebase from "../../firebase";
import {
  AntDesign,
  Feather,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";

const window = Dimensions.get("window");
const handleSignOut = async () => {
  Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
    // 버튼 배열
    {
      text: "아니요",
      style: "cancel",
    },
    {
      text: "네",
      onPress: async () => {
        await firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("Signed Out !!");
          });
      },
    },
  ]);
};

function UserProfile({ userInfo, navigation }) {
  // console.log(userInfo)
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View>
        <Image
          style={styles.backgroundimg}
          source={require("../../assets/backgroundimg.png")}
        />
        <View
          style={{
            backgroundColor: "white",
          }}
        >
          <View style={styles.logout}>
            <Ionicons
              onPress={handleSignOut}
              name="ios-settings-outline"
              size={24}
              color="black"
            />
          </View>
        </View>
        <View style={styles.backgroundimg} />
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageModal
            resizeMode="contain"
            style={styles.profileimg}
            source={require("../../assets/lopy.png")}
            onRequestClose={() => setModalVisible(false)}
          ></ImageModal>
          <View style={styles.textbox}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{ marginTop: 5, flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("EditProfile", {
                    userInfo: userInfo,
                  })
                }
              >
                <Text style={styles.headerText}>
                  닉네임 : {userInfo.nickname}
                </Text>
                <SimpleLineIcons name="pencil" size={17} color="grey" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 13,
              }}
            ></View>
            <Divider style={{ marginTop: 20 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  내가 쓴 글
                </Text>
                <Text style={{ fontSize: 13 }}>12</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  저장한 글
                </Text>
                <Text style={{ fontSize: 13 }}>13</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  저장한 전통주
                </Text>
                <Text style={{ fontSize: 13 }}>13</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    width: window.width,
    height: window.width / 1.5,
    justifyContent: "center",
    backgroundColor: "white",
  },
  backgroundimg: {
    width: window.width,
    flex: 1,
    backgroundColor: "rgba(250,250,250,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.8)",
    marginLeft: 5,
    fontWeight: "bold",
    marginRight: 5,
  },
  profileimg: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 1.5,
    justifyContent: "center",
    borderColor: "#C0E8E0",
    marginLeft: 150,
    marginTop: 10,
    marginBottom: 5,
  },
  textbox: {
    width: window.width - 170,
    // borderRadius: 15,
    // borderWidth: 1.6,
    // borderColor: "black",
    marginTop: 3,
    marginBottom: 10,
  },
  logout: { alignItems: "flex-end", marginRight: 15 },
  profiletag: {
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#C0E8E0",
    marginRight: 5,
  },
});

export default UserProfile;
