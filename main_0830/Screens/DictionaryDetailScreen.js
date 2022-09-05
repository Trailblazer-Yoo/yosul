import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import React from "react";

const window = Dimensions.get('window')

export default function DictionaryDetailScreen({ route }) {
  const item = route.params.item;
  return (
    <View style={styles.container}>
      <View style={styles.uppercontainer}>
        <Image style={styles.img} source={{ uri: item.img }} />
        <View>
          <Text>{item.name}</Text>
          <Text>분류: {item.category}</Text>
          <Text>주재료: {item.meterial}</Text>
          <Text>도수: {item.alc}</Text>
          <Text>용량: {item.size}</Text>
        </View>
      </View>
      <View>
        <Text>수상 내역: {item.awards}</Text>
        <Text>어울리는 음식: {item.pairing}</Text>
        <Text>양조장: {item.craft}</Text>
        <Text>주소: {item.address}</Text>
        <Text>전화번호: {item.tel}</Text>
        <Text onPress={() => Linking.openURL(item.homepage)}>홈페이지</Text>
        <Text>상세: {item.details}</Text>
        <Text>기타: {item.etc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30
  },
  uppercontainer: {
    // width:window.width/2,
    // height:window.width/2,
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    marginBottom: 10,
  },
  img: {
    width:window.width/2.2,
    height:window.width/2.2,
    resizeMode: "contain",
    marginBottom: 10,
    borderColor:'black',
    borderWidth:5,
    borderRadius:30,
    marginRight:15,
  },
});
