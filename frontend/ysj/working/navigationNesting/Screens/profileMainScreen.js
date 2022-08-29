import React, { Component,  useState } from 'react';
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import sulfriends from './sulfriends';
// import profileScreen from './profileScreen';


export default function Profilemainscreen({navigation}) {
  return (
    <ScrollView>
      <View style={styles.container}>
          <View style={styles.header}></View>
          <TouchableOpacity>
          <View style={styles.profilecontainer}>
          <Text style={styles.profiletitle}>개인정보</Text>
          <Text style={styles.profiledescription}>닉네임: 루피님</Text>
          <Text style={styles.profiledescription}>나이: 26세</Text>
          <Text style={styles.profiledescription}>지역: 서울시 마포구</Text>
          <Text style={styles.profiledescription}>선호 주종: 증류주</Text>
          <Text style={styles.profiledescription}>선호 도수: 17%</Text>
          <Image style={styles.avatar} 
          source={{uri: 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg'}}/>

          
  
          </View>
          </TouchableOpacity>
          <View style={styles.body}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.question}>술친구 관리</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.question}>업적</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.question}>게시물 다시보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.question}>즐겨찾기한 전통주</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.question}>내가 작성한 글</Text>
          </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
    );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  profilecontainer: {
    marginTop:5,
    height:270,
    marginBottom:5,
    width:390,
    borderColor: "#C0E8E0",
    borderWidth: 5,
    borderRadius:30,
    backgroundColor: "#C0E8E0",
  },
  profiletitle: {
    fontSize:20,
    color:"black",
    fontWeight:'600',
    marginTop:15,
    paddingHorizontal: 155,
  },
  profiledescription: {
    fontSize:15,
    color:"black",
    fontWeight:'500',
    paddingHorizontal: 220,
    marginBottom:1,
    marginTop:20,
  },
  avatar: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom:1,
    alignSelf:'left',
    top: 55,
    left: 20,
  },
  buttonContainer: {
    height:100,
    marginBottom:5,
    width:390,
    borderColor: "#C0E8E0",
    borderWidth: 5,
    borderRadius:30,
    backgroundColor: "#C0E8E0",
  },
  question: {
    fontSize: 20,
    fontWeight: '100',   
    alignSelf: 'center',
    marginTop: 30,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}
);
