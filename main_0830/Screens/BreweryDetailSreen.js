import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-elements";

export default function BreweryDetailScreen({ navigation, route }) {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  const [attraction, setAttraction] = useState([]);
  const [event, setEvent] = useState([]);
  const item = route.params.item;
  const getAttraction = async () => {
    const response = await fetch(
      `https://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB%2FFGnDuzloLHkpvLvTyddzf00SKndA%2F1naWcmH2ao5jg%3D%3D&_type=json&areaCode=${item.areaCode}&sigunguCode=${item.sigunCode}`
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      setAttraction(responseJson["response"]["body"]["items"]["item"]);
    }
    // console.log(attraction);
  };
  const getEvent = async () => {
    const response = await fetch(
      // `https://apis.data.go.kr/B551011/KorService/searchFestival?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB%2FFGnDuzloLHkpvLvTyddzf00SKndA%2F1naWcmH2ao5jg%3D%3D&_type=json&areaCode=${item.areaCode}&sigunguCode=${item.sigunCode}&eventStartDate=${year}${month}${date}`
      `https://apis.data.go.kr/B551011/KorService/searchFestival?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB%2FFGnDuzloLHkpvLvTyddzf00SKndA%2F1naWcmH2ao5jg%3D%3D&_type=json&areaCode=${item.areaCode}&sigunguCode=${item.sigunCode}`
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      setEvent(responseJson["response"]["body"]["items"]["item"]);
    }
    console.log(event);
  };

  useEffect(() => {
    getAttraction();
    getEvent();
  }, []);

  const renderListItemForAttraction = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.img} source={{ uri: item.firstimage }} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.attractionText}>{item.addr1}</Text>
        </View>
      </View>
    );
  };

  const renderListItemForEvent = ({ item, index }) => {
    return (
      <View>
        <Pressable
          onPress={() =>
            navigation.push("BreweryDetailScreen", { id: index, item: item })
          }
        >
          <Image style={styles.img} source={{ uri: item.firstimage }} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.text}>시작: {item.eventstartdate}</Text>
            <Text style={styles.text}>종료: {item.eventenddate}</Text>
            <Text style={styles.text}>주소: {item.addr1}</Text>
            <Text style={styles.text}>전화번호: {item.tel}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{}}>
          <ImageBackground
            source={require("../assets/brewery1.png")}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width * 0.85,
              position: "relative",
              zIndex: 0,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../assets/arrow.png")}
                style={{
                  marginTop: 50,
                  marginLeft: 20,
                  position: "relative",
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.breweryDetail}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <Text style={{ fontSize: 16, color: "#393E59", marginBottom: 15 }}>
              {item.activity_name}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontSize: 27, fontWeight: "bold", marginBottom: 15 }}
            >
              {item.name}
            </Text>
            <Divider style={{ borderColor: "black" }} />
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                marginBottom: 20,
                marginHorizontal: 15,
              }}
            >
              {item.activity}
            </Text>
          </View>
          <View style={styles.detailText}>
            <Image
              style={styles.icon}
              source={require("../assets/location.png")}
            />
            <Text style={styles.infomationText}>{item.address}</Text>
          </View>
          <View style={styles.detailText}>
            <Image
              style={styles.icon}
              source={require("../assets/barrel.png")}
            />
            <Text style={styles.infomationText}>{item.sul_type}</Text>
          </View>
          <View style={styles.detailText}>
            <Image style={styles.icon} source={require("../assets/time.png")} />
            <Text style={styles.infomationText}>소요시간: {item.time}</Text>
          </View>
          <View style={styles.detailText}>
            <Image
              style={styles.icon}
              source={require("../assets/charge.png")}
            />
            <Text style={styles.infomationText}>{item.cost}</Text>
          </View>
          <View style={styles.detailText}>
            <Image
              style={styles.icon}
              source={require("../assets/reservation1.png")}
            />
            <Text style={styles.infomationText}>
              상시방문가능여부 : {item.regular_visit}
            </Text>
            <Divider />
          </View>
          <Text
            style={[
              styles.infomationText,
              { marginLeft: 37.5, marginBottom: 7 },
            ]}
          >
            예약가능여부: {item.reservation}
          </Text>
          <View style={styles.detailText}>
            <Image
              style={styles.icon}
              source={require("../assets/phone.png")}
            />
            <Text style={styles.infomationText}>{item.telephone}</Text>
          </View>
          {typeof item.homepage === "undefined" ? null : (
            <Text onPress={() => Linking.openURL(item.homepage)}>홈페이지</Text>
          )}
        </View>
        {attraction.length === 0 ? null : (
          <View style={styles.attraction}>
            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
                marginBottom: 20,
                marginLeft: 15,
              }}
            >
              같이 방문하면 좋은 관광지
            </Text>
            <FlatList
              // horizontal={true}
              data={attraction.slice(0, 5)}
              renderItem={renderListItemForAttraction}
            />
          </View>
        )}
        {event.length === 0 ? null : (
          <View style={styles.tourEvent}>
            <Text>
              {item.address.substr(
                0,
                item.address.indexOf(" ", item.address.indexOf(" ") + 1)
              )}{" "}
              행사
            </Text>
            <FlatList
              horizontal={true}
              data={event.slice(0, 5)}
              renderItem={renderListItemForEvent}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 30,
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
  },
  breweryDetail: {
    flex: 2,
    // backgroundColor: "red",
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    marginBottom: 10,
  },
  attraction: {
    flex: 1,
    // backgroundColor: "blue",
    marginBottom: 20,
  },
  tourEvent: {
    flex: 1,
    backgroundColor: "blue",
    marginBottom: 20,
  },
  img: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").width / 5,
    resizeMode: "contain",
    borderColor: "#C0E8E0",
    borderRadius: 20,
    marginRight: 20,
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 15,
    backgroundColor: "#393E59",
  },
  icon: {
    width: Dimensions.get("window").width / 20,
    height: Dimensions.get("window").width / 20,
    marginRight: 5,
    marginLeft: 10,
  },
  detailText: {
    // backgroundColor: "green",
    flexDirection: "row",
    marginBottom: 7,
  },
  infomationText: {
    fontSize: 17.5,
  },
  name: {
    fontSize: 19,
    fontWeight: "600",
    marginTop: 17,
    marginBottom: 13,
  },
  attractionText: {
    fontSize: 15,
  },
});
