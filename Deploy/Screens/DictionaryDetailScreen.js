import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import firebase from "../firebase";
import HeartIcon from "../Components/Dictionary/HeartIcon";
import BookmarkIcon from "../Components/Dictionary/BookmarkIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";

const window = Dimensions.get("window");
const db = firebase.firestore();

export default function DictionaryDetailScreen({ route }) {
  const item = route.params.item;
  const imageArray = {
    0: require("../assets/soolType/0.jpg"),
    1: require("../assets/soolType/1.jpg"),
    2: require("../assets/soolType/2.jpg"),
    3: require("../assets/soolType/3.jpg"),
    4: require("../assets/soolType/4.jpg"),
  };
  return (
    <SafeAreaView style={styles.remain}>
      <ScrollView style={styles.container}>
        <View style={styles.uppercontainer}>
          <Image style={styles.img} source={imageArray[item.typeCode]} />
          <View>
            <Text style={styles.titletext}>{item.soolName}</Text>
            <Text style={styles.listtext}>분류 : {item.soolType}</Text>
            <Text style={styles.listtext}>도수 :{item.soolAlcohol}</Text>
            <Text style={styles.listtext}>용량 : {item.soolCapacity}</Text>
            <Text style={styles.listtext}>
              지역 :{" "}
              {item.breweryAddress === "None"
                ? " 정보없음 "
                : item.breweryAddress.substr(
                    0,
                    item.breweryAddress.indexOf(
                      " ",
                      item.breweryAddress.indexOf(" ") + 1
                    )
                  )}
            </Text>
            <View style={styles.iconwrapper}>
              <HeartIcon
                item={item}
                currentUserEmail={firebase.auth().currentUser.email}
                screenState={true}
              />
              <BookmarkIcon
                item={item}
                currentUserEmail={firebase.auth().currentUser.email}
                screenState={true}
              />
            </View>
          </View>
        </View>
        <View>
          {!item.soolDetailInfo ? (
            <></>
          ) : (
            <View style={{ marginTop: 25 }}>
              <Text style={styles.contenttitle}>저희 술은</Text>
              <Text>{item.soolDetailInfo}</Text>
            </View>
          )}
          <View style={{ marginTop: 50 }}>
            <Text style={styles.contenttitle}>다음으로 만들었습니다!</Text>
            <Text>{item.soolMaterial}</Text>
          </View>
          {!item.soolPrize ? (
            <></>
          ) : (
            <View style={{ marginTop: 50 }}>
              <Text style={styles.contenttitle}>이런 경력도 있습니다!</Text>
              <Text>{item.soolPrize}</Text>
            </View>
          )}
          {!item.soolMatchFood ? (
            <></>
          ) : (
            <View style={{ marginTop: 50 }}>
              <Text style={styles.contenttitle}>
                함께 드시면 더욱 좋습니다!
              </Text>
              <Text>{item.soolMatchFood}</Text>
            </View>
          )}
          {!item.breweryName ? (
            <></>
          ) : (
            <View style={{ marginTop: 50 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.contenttitle}>
                  직접 방문해보시는건 어떤가요?
                </Text>
              </View>
              <Text>양조장 : {item.breweryName}</Text>
            </View>
          )}
          {!item.breweryAddress ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                const addr1 = item.breweryAddress;
                await Clipboard.setStringAsync(addr1);
                if (Clipboard.hasStringAsync()) {
                  alert("복사 완료");
                  console.log(addr1);
                }
              }}
            >
              <Text>
                상세주소:{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  {item.breweryAddress}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          {!item.breweryPhone ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                const phone = item.breweryPhone;
                await Clipboard.setStringAsync(phone);
                if (Clipboard.hasStringAsync()) {
                  alert("복사 완료");
                  console.log(phone);
                }
              }}
            >
              <Text>
                전화번호:{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  {item.breweryPhone}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          {!item.breweryHomepage ? (
            <></>
          ) : (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => Linking.openURL(item.breweryHomepage)}
            >
              <MaterialCommunityIcons
                name="search-web"
                size={20}
                color="black"
              />
              <Text>홈페이지 방문을 원하면 클릭해주세요!</Text>
            </TouchableOpacity>
          )}
          {!item.soolEtc ? (
            <></>
          ) : (
            <View style={{ marginTop: 50 }}>
              <Text style={styles.contenttitle}>기타이력</Text>
              <Text>{item.soolEtc}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  remain: { flex: 1, backgroundColor: "#fff", paddingVertical: 35 },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  uppercontainer: {
    width: window.width / 2.3,
    flexDirection: "row",
  },
  titletext: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: -2,
    marginBottom: 10,
  },
  iconwrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listtext: {
    fontSize: 14,
  },
  contenttitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  img: {
    width: window.width / 2.3,
    height: window.width / 2.3,
    resizeMode: "contain",
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 5,
    borderRadius: 30,
    marginRight: 15,
  },
});
