import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import Snackbar from "react-native-paper";
import * as Clipboard from "expo-clipboard";

export default function BreweryDetailScreen({ navigation, route }) {
  const PLACEHOLDER_IMG =
    "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";
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
      // `http://apis.data.go.kr/B551011/KorService/searchFestival?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB%2FFGnDuzloLHkpvLvTyddzf00SKndA%2F1naWcmH2ao5jg%3D%3D&_type=json&areaCode=${item.areaCode}&sigunguCode=${item.sigunCode}&eventStartDate=${year}${month}${date}`
      `http://apis.data.go.kr/B551011/KorService/searchFestival?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB%2FFGnDuzloLHkpvLvTyddzf00SKndA%2F1naWcmH2ao5jg%3D%3D&_type=json&areaCode=${item.areaCode}&sigunguCode=${item.sigunCode}&eventStartDate=${year}0101`
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

  // const copyComplete = () => {

  //   return (
  //     <Snackbar visible={true} onDismiss={false}>
  //       복사 완료!
  //     </Snackbar>
  //   );
  // };

  const renderListItemForAttraction = ({ item, index }) => {
    return (
      <View style={{ justifyContent: "center", marginTop: 20 }}>
        <Image
          style={styles.img}
          source={{
            uri: !!item.firstimage ? item.firstimage : PLACEHOLDER_IMG,
          }}
        />
        <View style={{marginLeft:5}}>
          <Text style={styles.name}>{item.title}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 27,
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                const address1 = item.addr1;
                await Clipboard.setStringAsync(address1);
                if (Clipboard.hasStringAsync()) {
                  alert("복사 완료");
                  console.log(address1);
                }
              }}
            >
              <Text style={styles.attractionText}>{item.addr1}</Text>
            </TouchableOpacity>
          </View>
          <Divider />
        </View>
      </View>
    );
  };

  const renderListItemForEvent = ({ item, index }) => {
    return (
      <View>
        <Image
          style={styles.festivalImg}
          source={{
            uri: !!item.firstimage ? item.firstimage : PLACEHOLDER_IMG,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.festivalText}>
            일정 : {item.eventstartdate} ~ {item.eventenddate}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              const addr1 = item.addr1;
              await Clipboard.setStringAsync(addr1);
              if (Clipboard.hasStringAsync()) {
                alert("복사 완료");
                console.log(addr1);
              }
            }}
          >
            <Text style={styles.copyFestivalText}>주소: {item.addr1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const tel = item.tel;
              await Clipboard.setStringAsync(tel);
              if (Clipboard.hasStringAsync()) {
                alert("복사 완료");
                console.log(tel);
              }
            }}
          >
            <Text style={styles.copyFestivalText}>전화번호: {item.tel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            source={item.image}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width * 0.85,
              position: "relative",
            }}
          />
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
              {item.activityName}
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
            <TouchableOpacity
              onPress={async () => {
                const address = item.address;
                await Clipboard.setStringAsync(address);
                if (Clipboard.hasStringAsync()) {
                  alert("복사 완료");
                  console.log(address);
                }
              }}
            >
              <Text style={styles.copyInfomationText}>{item.address}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailText}>
            <Image
              style={styles.icon}
              source={require("../assets/barrel.png")}
            />
            <Text style={styles.infomationText}>{item.soolType}</Text>
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
            <Text style={styles.infomationText}>{item.cost}원</Text>
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
            <TouchableOpacity
              onPress={async () => {
                const phoneNumber = item.telephone;
                await Clipboard.setStringAsync(phoneNumber);
                if (Clipboard.hasStringAsync()) {
                  alert("복사 완료");
                  console.log(phoneNumber);
                }
              }}
            >
              <Text style={styles.copyInfomationText}>{item.telephone}</Text>
            </TouchableOpacity>
          </View>
          {typeof item.homepage === "undefined" ? null : (
            <Text onPress={() => Linking.openURL(item.homepage)}>홈페이지</Text>
          )}
        </View>
        {attraction.length === 0 ? null : (
          <View style={styles.attraction}>
            <Text style={styles.recommendTitle}>같이 방문하면 좋은 관광지</Text>
            <FlatList
              horizontal={true}
              pagingEnabled={true}
              data={attraction.slice(0, 5)}
              renderItem={renderListItemForAttraction}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        {event.length === 0 ? null : (
          <View style={styles.tourEvent}>
            <Text style={styles.recommendTitle}>
              {item.address.substr(
                0,
                item.address.indexOf(" ", item.address.indexOf(" ") + 1)
              )}{" "}
              행사
            </Text>
            <FlatList
              pagingEnabled={true}
              horizontal={true}
              data={event.slice(0, 5)}
              renderItem={renderListItemForEvent}
              showsHorizontalScrollIndicator={false}
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
    // backgroundColor: "blue",
    marginBottom: 20,
  },
  img: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.67,
    resizeMode: "contain",
    borderColor: "#C0E8E0",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    // marginLeft: 22,
    backgroundColor: "#C0E8E0",
  },
  festivalImg: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.67,
    resizeMode: "contain",
    borderColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    // marginLeft: 22,
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
  festivalText: {
    fontSize: 15,
    marginLeft: 27,
    marginBottom: 4,
  },
  copyFestivalText: {
    fontSize: 15,
    marginLeft: 27,
    marginBottom: 4,
    textDecorationLine: "underline",
  },
  copyInfomationText: {
    fontSize: 17.5,
    textDecorationLine: "underline",
  },
  name: {
    fontSize: 19,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 13,
    marginLeft: 28,
  },
  attractionText: {
    fontSize: 15,
    // marginRight: 40,
    marginBottom: 18,
    textDecorationLine:'underline',
  },
  copyAttraction: {
    backgroundColor: "#C0E8E0",
    borderRadius: 10,
    marginBottom: 18,
    width: Dimensions.get("window").width / 7,
    height: Dimensions.get("window").width / 17,
    justifyContent: "center",
    alignItems: "center",
  },
  recommendTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 15,
  },
});
