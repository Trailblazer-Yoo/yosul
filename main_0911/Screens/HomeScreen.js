import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  View,
  Dimensions,
  StatusBar,
  Animated,
  FlatList,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import firebase from "../firebase";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const images = [
  "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80",
  "https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80",
  "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80",
  "https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80",
  "https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80",
  "https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80",
  "https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80",
  "https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80",
  "https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80",
  "https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80",
];
const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
}));

const HomeScreen = () => {
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
    const data = [];
    for (let i = 0; i < breweryInfo.length; i++) {
      if (breweryInfo[i]["areaCode"] === areaCode) {
        data.push(breweryInfo[i]);
      }
      if (data.length === 5) {
        break;
      }
    }
    setFilteredBreweryInfo(data);
  };

  useEffect(() => {
    getBreweryInfo();
  }, []);

  useEffect(() => {
    filterBreweryInfo(areaCode);
  }, [breweryInfo]);

  console.log(filteredBreweryInfo);

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
          <View style={styles.imagewrapper}>
            <Animated.Image
              source={{ uri: item.photo }}
              style={{ ...styles.imagestyle, transform: [{ translateX }] }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderTextItem = ({ navigation, item, index }) => {
    return (
      <View style={styles.width}>
        <Pressable
          onPress={() =>
            navigation.push("BreweryDetailScreen", { id: index, item: item })
          }
        >
          <View style={styles.brewery_info}>
            <Text style={styles.activityText}>{item.activityName}</Text>
            <Text style={styles.breweryName}>{item.name}</Text>

            {/* <Text style={styles.text}>{item.soolType}</Text>
            <Text style={styles.text}>{item.address}</Text> */}
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.area}>
        <TextInput
          style={styles.areaText}
          onChangeText={(text) => setRegion(text)}
        >
          {region}
        </TextInput>
        <Button title="변경" onPress={() => getRegion(region)}></Button>
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItem}
      />
      <FlatList
        data={filteredBreweryInfo}
        keyExtractor={(item, index) => index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        renderItem={(item, index) => renderTextItem(item, index)}
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
  today_brewery: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  width: {
    flexDirection: "row",
    width: width,
    // paddingLeft: 10,
    justifyContent: "center",
  },
  brewery_photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  brewery_info: {
    // position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
    marginBottom: 30,
  },
  activityText: {
    // backgroundColor: "red",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "400",
  },
  breweryName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  today_beer: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  beer_photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  beer_info: {
    marginLeft: 30,
    justifyContent: "center",
  },
  underbar: {
    marginTop: 35,
    marginBottom: 35,
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 18,
    // backgroundColor: "black",
  },
  framestyle: {
    borderRadius: 18,
    padding: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  area: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  areaText: {
    fontSize: 28,
  },
});

export default HomeScreen;
