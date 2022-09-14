import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import ImageModal from "react-native-image-modal";
import { Divider } from "react-native-elements";
import firebase from "../../firebase";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";

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

function UserProfile({ userInfo, navigation, mypostslen }) {
  const [UserInfo, setUserInfo] = useState({
    nickname: "",
    myBookmarksPosts: [],
    myBookmarksDrinks: [],
    profile_picture: "",
  });

  useEffect(() => {
    if (userInfo !== undefined) {
      setUserInfo(userInfo);
    }
  }, [userInfo]);

  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View>
        <View style={styles.logout}>
          <Ionicons
            onPress={handleSignOut}
            name="ios-settings-outline"
            size={24}
            color="black"
          />
        </View>

        <View style={styles.profileimgback}>
          <ImageModal
            resizeMode="cover"
            style={styles.profileimg}
            source={{ uri: UserInfo.profile_picture }}
            onRequestClose={() => setModalVisible(false)}
          />
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View style={styles.textbox}>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{ marginTop: window.width * 0.03, flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("EditProfile", {
                    userInfo: UserInfo,
                  })
                }
              >
                <Text style={styles.headerText}>
                  닉네임 : {UserInfo.nickname}
                </Text>
                <SimpleLineIcons name="pencil" size={17} color="grey" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: window.width * 0.06,
              }}
            ></View>
            <Divider style={{ marginVertical: window.width * 0.01 }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: window.width * 0.05,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.listtext}>내가 쓴 글</Text>
                <Text style={styles.listtext}>{mypostslen}</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.listtext}>저장한 게시물</Text>
                <Text style={styles.listtext}>
                  {UserInfo.myBookmarksPosts.length}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.listtext}>찜한 전통주</Text>
                <Text style={styles.listtext}>
                  {UserInfo.myBookmarksDrinks.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginTop:window.width*0.02,
    width: window.width,
    height: window.width / 1.5,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: window.width * 0.035,
    color: "rgba(0,0,0,0.8)",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  profileimgback: {
    left:window.width *0.38,
    marginTop:window.width*0.03,

   },
  profileimg: {
    width: window.width * 0.23,
    height: window.width * 0.23,
    borderRadius: window.width,
    borderWidth: 1.5,
    borderColor: "#C0E8E0",
  },
  textbox: {
    marginTop: window.width * 0.02,
    width: window.width * 0.7,
    height: window.width * 0.3,
    justifyContent: "center",
  },
  listtext: {
    marginBottom: window.width * 0.017,
    fontWeight: "600",
    fontSize: window.width * 0.03,
  },

  logout: {
    alignItems: "flex-end",
    marginRight: window.width * 0.03,
    height: window.width * 0.06,
  },
});

export default UserProfile;
