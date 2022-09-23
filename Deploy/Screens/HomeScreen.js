import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  View,
  Dimensions,
  StatusBar,
  Animated,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import firebase from "../firebase";
import { regionCode } from "../regionCode";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = height * 0.518;

const images = {
  그린영농조합: require("../assets/brewery/greenyoungnong.png"),
  밝은세상영농조합: require("../assets/brewery/balguensaesang.png"),
  배상면주가: require("../assets/brewery/baesangmyeon.png"),
  배혜정도가: require("../assets/brewery/baehyejungdoga.png"),
  산머루농원: require("../assets/brewery/sanmeoru.png"),
  술샘: require("../assets/brewery/soolsam1.png"),
  좋은술: require("../assets/brewery/joeunsool.png"),
};

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState("경기도");
  const [areaCode, setAreaCode] = useState("31");
  const [breweryInfo, setBreweryInfo] = useState([]);
  const [filteredBreweryInfo, setFilteredBreweryInfo] = useState([]);
  const globalCollection = firebase.firestore().collection("global");

  const getBreweryInfo = async () => {
    const dataSnapShot = (await globalCollection.doc("breweries").get()).data();
    const data = [];
    data.push(Object.values(dataSnapShot));
    setBreweryInfo(data[0]);
    // console.log(breweryInfo);
  };

  const getRegion = (text) => {
    setRegion(text);
    for (let i = 0; i < regionCode.length; i++) {
      if (text === regionCode[i]["name"]) {
        setAreaCode(regionCode[i]["code"]);
        break;
      }
    }
    filterBreweryInfo(areaCode);
  };

  const filterBreweryInfo = () => {
    const data1 = [];
    for (let i = 0; i < breweryInfo.length; i++) {
      if (breweryInfo[i]["areaCode"] === areaCode) {
        data1.push({ ...breweryInfo[i] });
      }
    }
    data1.sort(function compare(a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    const data2 = [];
    for (var d of data1) {
      let key = d["name"];
      data2.push({ ...d, ...{ image: images[d["name"]] } });
    }

    setFilteredBreweryInfo(data2);
  };

  useEffect(() => {
    getBreweryInfo();
  }, []);

  useEffect(() => {
    filterBreweryInfo(areaCode);
  }, [breweryInfo]);

  console.log(filteredBreweryInfo.image);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width * 0.8, 0, width * 0.8],
    });
    return (
      <View style={{ width, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.framestyle}>
          <Pressable
            style={styles.imagewrapper}
            onPress={() =>
              navigation.push("BreweryDetailScreen", {
                id: index,
                item: item,
              })
            }
          >
            <Animated.Image
              source={item.image}
              style={{ ...styles.imagestyle, transform: [{ translateX }] }}
            />
          </Pressable>
        </View>
        {index === 5 ? (
          <View style={{ marginTop: width * 0.012, marginRight: width * 0.6 }}>
            <Text style={{ fontSize: RFPercentage(0.92), color: "#444" }}>
              출처 : 술샘
            </Text>
          </View>
        ) : (
          <View style={{ marginTop: width * 0.012, marginRight: width * 0.3 }}>
            <Text style={{ fontSize: RFPercentage(0.92), color: "#444" }}>
              출처 : 카카오맵 로드뷰 (https://map.kakao.com)
            </Text>
          </View>
        )}

        <View style={styles.brewery_info}>
          <Text style={styles.activityText}>{item.activityName}</Text>
          <Text style={styles.breweryName}>{item.name}</Text>
        </View>
        <View style={{ top: -15 }}>
          <TouchableOpacity
            onPress={
              // (text) => setRegion(text) 우선 변경 안되게
              console.log("지역변경")
            }
          >
            <Text style={styles.areaText}>{region}</Text>
          </TouchableOpacity>
          {/* <Button title="변경" onPress={() => getRegion(region)}></Button> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={filteredBreweryInfo.slice(0, 7)}
        keyExtractor={(item, index) => index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop:
      Platform.OS === "ios"
        ? getStatusBarHeight(true)
        : StatusBar.currentHeight,
  },
  width: {
    flexDirection: "row",
    width: width,
    // paddingLeft: 10,
    justifyContent: "center",
  },
  brewery_info: {
    marginTop: width * 0.07,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: width * 0.06,
  },
  activityText: {
    color: "gray",
    marginBottom: width * 0.02,
    fontSize: width * 0.045,
    fontWeight: "400",
  },
  breweryName: {
    fontSize: width * 0.08,
    fontWeight: "bold",
  },
  imagestyle: {
    width: ITEM_WIDTH * 1.2,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  imagewrapper: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    alignItems: "center",
    borderRadius: width * 0.04,
    // backgroundColor: "black",
  },
  framestyle: {
    borderRadius: width * 0.04,
    padding: width * 0.033,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: width * 0.06,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  areaText: {
    fontSize: width * 0.05,
    opacity: 0.35,
    alignItems: "center",
  },
});

export default HomeScreen;
