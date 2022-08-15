import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import * as Location from 'expo-location';

// 1. 사진 패딩주는 법
// 2. 사진 라운드로 바꾸기, 그림자 넣는 법?
//   이미지 크기 고정해야할 필요 있음(DB에 저장할 때)
// 3. 양조장 이름, 술 이름 크게
// 4. 오늘의 술 아이콘 이미지?로 넣는 법 구상
// 5. 추천 시스템 넣을 곳도 공간 만들기!
// 6. 이외에 다른 것들 넣을 것 있는지?
// 추천 시스템 주제
// 일반적인 정보 + 유저 정보 
// 그림자 없는 버전, 그리고 흰거만 있는 버전 주형님께 보내드리기
// 주형님께 보내드린 파일 그림자, 그림자 + 그라데이션 버전
// 크랙?, 지마켓
// 커뮤니티 메인 화면

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeScreen = () => {
  const [city, setCity] = useState("Loding...")
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false)
    }
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMap: false })
    setCity(location[0].city)
  }
  useEffect(() => {
    ask();
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.location}><Text>{city}</Text></View>
      <ScrollView>
        <Text style={styles.today_brewery}>오늘의 양조장 🏘</Text>
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <View style={styles.width}>
            <Image
              style={styles.brewery_photo}
              source={{uri: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F202003%2FEYM%2F1211292280.jpg&type=a340'}} />
            <View style={styles.brewery_info}>
              {/* DB에서 사진이랑 정보 받을 것 */}
              <Text>금품 양조장</Text>
              <Text>주종 : 막걸리</Text>
              <Text>평일 : 오전 10시 ~ 오후 6시</Text>
              <Text>주말 : 오전 10시 ~ 오후 6시</Text>
              <Text>위치</Text>
            </View>
          </View>
          <View style={styles.width}>
            <Image
              style={styles.brewery_photo}
              source={{uri: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F202003%2FEYM%2F1211292280.jpg&type=a340'}} />
            <View style={styles.brewery_info}>
              {/* DB에서 사진이랑 정보 받을 것 */}
              <Text>금품 양조장</Text>
              <Text>주종 : 막걸리</Text>
              <Text>평일 : 오전 10시 ~ 오후 6시</Text>
              <Text>주말 : 오전 10시 ~ 오후 6시</Text>
              <Text>위치</Text>
            </View>
          </View>
        </ScrollView>
        <Text style={styles.today_beer}>오늘의 술 🍶</Text>
        <ScrollView
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          <View style={styles.width}>
            <Image
              style={styles.beer_photo}
              source={{uri: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F202003%2FEYM%2F1211292280.jpg&type=a340'}} />
            <View style={styles.beer_info}>
              {/* DB에서 정보 받을 것 */}
              <Text>풍정사계</Text>
              <Text>주종 : 막걸리</Text>
              <Text>평일 : 오전 10시 ~ 오후 6시</Text>
              <Text>주말 : 오전 10시 ~ 오후 6시</Text>
              <Text>위치</Text> 
            </View>
          </View>
          <View style={styles.width}>
            <Image
              style={styles.beer_photo}
              source={{uri: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumb2.gettyimageskorea.com%2Fimage_preview%2F700%2F202003%2FEYM%2F1211292280.jpg&type=a340'}} />
            <View style={styles.beer_info}>
              {/* DB에서 정보 받을 것 */}
              <Text>풍정사계</Text>
              <Text>주종 : 막걸리</Text>
              <Text>평일 : 오전 10시 ~ 오후 6시</Text>
              <Text>주말 : 오전 10시 ~ 오후 6시</Text>
              <Text>위치</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  location: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
    marginBottom: 15
  },
  today_brewery: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20
  },
  width: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
    paddingLeft: 10
  },
  brewery_photo: {
    height: 200,
    width: 200,
    borderRadius: 10,
  },
  brewery_info: {
    marginLeft: 30,
    justifyContent: "center",
  },
  today_beer: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 20
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
  }
});

export default HomeScreen;