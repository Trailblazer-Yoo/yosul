import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const window = Dimensions.get("window");

function UserProfile(props) {
  return (
    <View style={styles.rootContainer} pointerEvents="box-none">
      <View>
        <Image
          style={styles.backgroundimg}
          source={require("../../assets/backgroundimg.png")}
        />
        <View style={{ flexDirection: 'row', backgroundColor: "white"}}>
          <Image
            style={styles.profileimg}
            source={require("../../assets/lopy.png")}
          />
          <View style={styles.textbox}>
            <View style={{}}>
            <TouchableOpacity style={{ flexDirection: "row" , justifyContent:'space-between'}}>
              <Text style={styles.headerText}>닉네임 귀염뽀짝 루우피</Text>
              <Text style={{
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 1.6,
                    borderColor: "#C0E8E0"
              }}>수정</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 2}}>
              <Text>팔로우   </Text>
              <Text>1.0 M</Text>
              <Text>   팔로잉   </Text>
              <Text>25</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text>주량 : 1.5병</Text>
              <Text>선호 주종 : 증류주</Text>
            </TouchableOpacity>
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
    height: window.height / 3.2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(250,250,250,0.8)",
  },
  backgroundimg: {
    width: window.width,
    height: window.height / 5.5,
    flex: 1,
  },
  headerText: {
    fontSize: 15,
    color: "rgba(0,0,0,0.8)",
    marginLeft: 0,

  },
  profileimg: {
    marginTop: -50,
    marginLeft: 10,
    marginRight: 30,
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 1.6,
    marginBottom: 10,
    justifyContent: "center",
    borderColor: "#C0E8E0",
  },
  textbox:{
    width : window.width - 170,
    // borderRadius: 15,
    // borderWidth: 1.6,
    // borderColor: "black",
    marginTop:10
  }
});

export default UserProfile;
