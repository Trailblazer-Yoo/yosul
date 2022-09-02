import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import ImageModal from 'react-native-image-modal';
import { Divider } from 'react-native-elements';

const window = Dimensions.get("window");

function UserProfile(props) {
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View>
        <Image
          style={styles.backgroundimg}
          source={require("../../assets/backgroundimg.png")}
        />
        <View style={{ backgroundColor: "white", justifyContent: 'center', alignItems:  'center'}}>
            <ImageModal
            resizeMode="contain"
            style={styles.profileimg}
            source={require("../../assets/lopy.png")
            }
            onRequestClose={() => setModalVisible(false)}>
          </ImageModal>
          <View style={styles.textbox}>
            <View style={{}}>
            <TouchableOpacity style={{ flexDirection: "row" , justifyContent:'center'}}>
              <Text style={styles.headerText}>닉네임 귀염뽀짝 루우피</Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection: "row", justifyContent:'center', marginTop: 13}}>
               <TouchableOpacity>
                <View style={styles.profiletag}>
                  <Text style={{fontSize: 12}}> 주량: 2병 </Text>
                </View>
               </TouchableOpacity>
               <TouchableOpacity>
                <View style={styles.profiletag}>
                    <Text style={{fontSize:12}}> 선호 주종: 과실주 </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.profiletag}>
                    <Text style={{fontSize:12}}> 선호 도수: 15%~20% </Text>
                  </View>
                </TouchableOpacity>
            </View>
            <Divider style={{marginTop: 20}}/>
              <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                <View style={{ marginTop:25, justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold', fontSize:15}}>팔로워 </Text>
                  <Text style={{fontSize:13}}>1.0M</Text>
                </View>
                <View style={{ marginTop:20, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontWeight:'bold', fontSize:15}}>팔로잉 </Text>
                  <Text style={{fontSize:13}}>25</Text>
                </View>
                <View style={{ marginTop:20, justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold', fontSize:15}}>저장수 </Text>
                  <Text style={{fontSize:13}}>3</Text>
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
    height: window.height/2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(250,250,250,0.8)",
  },
  backgroundimg: {
    width: window.width,
    height: window.height,
    flex: 1,
  },
  headerText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.8)",
    marginLeft: 0,
    fontWeight: 'bold',
  },
  profileimg: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 1.5,
    justifyContent: "center",
    borderColor: "#C0E8E0",
    marginLeft: 150,
    marginTop: 10
  },
  textbox:{
    width : window.width - 170,
    // borderRadius: 15,
    // borderWidth: 1.6,
    // borderColor: "black",
    marginTop:3,
    marginBottom: 10
  },
  profiletag: {
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#C0E8E0",
    marginRight: 5
  },
});

export default UserProfile;
