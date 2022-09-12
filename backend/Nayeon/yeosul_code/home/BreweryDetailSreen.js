import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Linking,
    ActivityIndicator
  } from "react-native";
  import React from "react";
  
  export default function BreweryDetailScreen({ route }) {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    const [attraction, setAttraction] = useState([]);
    const [event, setEvent] = useState([]);
    const item = route.params.item;
    const getAttraction = async() => {
        const response = await fetch(
            `https://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB%2FFGnDuzloLHkpvLvTyddzf00SKndA%2F1naWcmH2ao5jg%3D%3D&_type=json&areaCode=${item.areaCode}&sigunguCode=${item.sigunCode}`
        );
        if (response.status === 200){
            const responseJson = await response.json();
            setAttraction(responseJson['response']['body']['items']['item']);
        }
        // console.log(attraction);
    }
    const getEvent = async() => {
        const response = await fetch(
            `https://apis.data.go.kr/B551011/KorService/searchFestival?numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=S256yGjpf7ug3eDtNRoJBzPLPIED9Mzp3XfMp8aaoRB%2FFGnDuzloLHkpvLvTyddzf00SKndA%2F1naWcmH2ao5jg%3D%3D&_type=json&areaCode=${item.areaCode}&sigunguCode=${item.sigunCode}&eventStartDate=${year}${month}${date}`
        );
        if (response.status === 200){
            const responseJson = await response.json();
            setEvent(responseJson['response']['body']['items']['item']);
        }
        // console.log(event);
    }

    useEffect(() => {
        getAttraction();
        getEvent();
      }, []);

    const renderListItemForAttraction = ({ item, index }) => {
        return (
          <View>
              <Image style={styles.img} source={{ uri: item.firstimage }} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.text}>주소: {item.addr1}</Text>
              </View>
          </View>
        );
    }

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
    }

    return (
        <View style={styles.container}>
            <View style={styles.breweryDetail}>
                <Text>{item.name}</Text>
                <Text>체험명: {item.activity_name}</Text>
                <Text>체험 소개: {item.activity}</Text>
                <Text>주종: {item.sul_type}</Text>
                <Text>상시방문가능여부: {item.regular_visit}</Text>
                <Text>예약가능여부: {item.reservation}</Text>
                <Text>소요시간: {item.time}</Text>
                <Text>가격: {item.cost}</Text>
                <Text>전화번호: {item.telephone}</Text>
                <Text onPress={() => Linking.openURL(item.homepage)}>홈페이지</Text>
            </View>
            {typeof(attraction) === 'undefined' ? null : (
                <View style={styles.attraction}>
                    <Text>같이 방문하면 좋은 관광지</Text>
                    <FlatList
                        horizontal={true}
                        data={attraction.slice(0,5)}
                        renderItem={renderListItemForAttraction} />
                </View>
            )}
            {typeof(event) === 'undefined' ? null : (
                <View style={styles.tourEvent}>
                    <Text>지금 진행 중인 행사</Text>
                    <FlatList
                        horizontal={true}
                        data={event.slice(0,5)}
                        renderItem={renderListItemForEvent} />
                </View>        
            )}   
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 30
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    breweryDetail: {
        marginBottom: 20
    },
    header: {
      fontSize: 30,
      marginBottom: 10,
    },
    attraction: {
        marginBottom: 20
    },
    tourEvent: {
        marginBottom: 20
    }
  });
