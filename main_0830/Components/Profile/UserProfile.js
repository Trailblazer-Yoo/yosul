import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
<<<<<<< HEAD
import ImageModal from 'react-native-image-modal';
import { Divider } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { ProfileScreenEdit } from '../../Screens/ProfileScreenEdit';
import { useNavigation } from '@react-navigation/native';
import { ProfileStack } from '../../navigation';

const window = Dimensions.get("window");

function UserProfile ({ navigation }) { 
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View>
        <View
          style={styles.backgroundimg}/>
        <View style={{ backgroundColor: "white", justifyContent: 'center', alignItems:  'center'}}>
            <ImageModal
              resizeMode="contain"
              style={styles.profileimg}
              source={require("../../assets/lopy.png")
              }
              onRequestClose={() => setModalVisible(false)}>
          </ImageModal>
          <View style={styles.textbox}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.headerText}>닉네임 귀염뽀짝 루우피</Text>
                <TouchableOpacity style={{marginLeft : 5}}>
                  <SimpleLineIcons name="pencil" size={17} color="grey"
                    onPress={() => navigation.navigate("ProfileScreenEdit")}/>
=======
import ImageModal from "react-native-image-modal";
import { Divider } from "react-native-elements";

const window = Dimensions.get("window");

function UserProfile({ props, navigation }) {
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View>
        <Image
          style={styles.backgroundimg}
          source={require("../../assets/backgroundimg.png")}
        />
        <View
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageModal
            resizeMode="contain"
            style={styles.profileimg}
            source={require("../../assets/lopy.png")}
            onRequestClose={() => setModalVisible(false)}
          ></ImageModal>
          <View style={styles.textbox}>
            <View style={{}}>
              <TouchableOpacity
                style={{ flexDirection: "row", justifyContent: "center" }}
              >
                <Text style={styles.headerText}>닉네임 귀염뽀짝 루우피</Text>
>>>>>>> 5320bc645d482e9faadb0a47e9008c32a819cef4
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 13,
              }}
            >
              <TouchableOpacity>
                <View style={styles.profiletag}>
                  <Text style={{ fontSize: 12 }}> 주량: 2병 </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.profiletag}>
                  <Text style={{ fontSize: 12 }}> 선호 주종: 과실주 </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.profiletag}>
                  <Text style={{ fontSize: 12 }}> 선호 도수: 15%~20% </Text>
                </View>
              </TouchableOpacity>
            </View>
<<<<<<< HEAD
            <Divider style={{marginTop: 20}}/>
              <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                <View style={{ marginTop:20, justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold', fontSize:15}}>내가 쓴 글</Text>
                  <Text style={{fontSize:13}}>12</Text>
                </View>
                <View style={{ marginTop:20, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontWeight:'bold', fontSize:15}}>저장한 글</Text>
                  <Text style={{fontSize:13}}>25</Text>
                </View>
                <View style={{ marginTop:20, justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold', fontSize:15}}>저장한 전통주</Text>
                  <Text style={{fontSize:13}}>3</Text>
                </View>
=======
            <Divider style={{ marginTop: 20 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  marginTop: 25,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  팔로워{" "}
                </Text>
                <Text style={{ fontSize: 13 }}>1.0M</Text>
>>>>>>> 5320bc645d482e9faadb0a47e9008c32a819cef4
              </View>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  팔로잉{" "}
                </Text>
                <Text style={{ fontSize: 13 }}>25</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  저장수{" "}
                </Text>
                <Text style={{ fontSize: 13 }}>3</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    width: window.width,
<<<<<<< HEAD
    height: window.height/2.7,
=======
    height: window.height / 2,
>>>>>>> 5320bc645d482e9faadb0a47e9008c32a819cef4
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  backgroundimg: {
    width: window.width,
    flex: 1,
    backgroundColor: "rgba(250,250,250,0.8)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.8)",
<<<<<<< HEAD
    marginLeft: 5,
    fontWeight: 'bold',
=======
    marginLeft: 0,
    fontWeight: "bold",
>>>>>>> 5320bc645d482e9faadb0a47e9008c32a819cef4
  },
  profileimg: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 1.5,
    justifyContent: "center",
    borderColor: "#C0E8E0",
    marginLeft: 150,
    marginTop: 10,
  },
  textbox: {
    width: window.width - 170,
    // borderRadius: 15,
    // borderWidth: 1.6,
    // borderColor: "black",
    marginTop: 3,
    marginBottom: 10,
  },
  profiletag: {
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#C0E8E0",
    marginRight: 5,
  },
});

export default UserProfile;
