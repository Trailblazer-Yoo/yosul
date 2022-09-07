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
        <Image style={styles.img} source={{ uri: item.soolUrl }} />
        <View>
          <Text>{item.soolName}</Text>
          <Text>분류: {item.soolType}</Text>
          <Text>주재료: {item.soolMaterial}</Text>
          <Text>도수: {item.soolAlcolhol}</Text>
          <Text>용량: {item.soolCapacity}</Text>
        </View>
      </View>
      <View>
        <Text>수상 내역: {item.soolPrize}</Text>
        <Text>어울리는 음식: {item.soolMatchFood}</Text>
        <Text>양조장: {item.breweryName}</Text>
        <Text>주소: {item.breweryAddress}</Text>
        <Text>전화번호: {item.breweryPhone}</Text>
        <Text onPress={() => Linking.openURL(item.breweryHomepage)}>홈페이지로 이동</Text>
        <Text>상세: {item.soolDetailInfo}</Text>
        <Text>기타: {item.soolEtc}</Text>
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
