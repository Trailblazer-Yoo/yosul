import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, Dimensions, Pressable } from "react-native";

const window = Dimensions.get("window")

const MyPosts = () => {
  const [people, setPeople] = useState([
    { img: require('../../assets/tayeon.png'), id: "1" },
    { img: require('../../assets/iu.png'), id: "2" },
    { img: require('../../assets/hoyeon.png'), id: "3" },
    { img: require('../../assets/seohyeon.png'), id: "4" },
    { img: require('../../assets/sooyeong.png'), id: "5" },
    { img: require('../../assets/sunny.png'), id: "6" },
    { img: require('../../assets/tiffany.png'), id: "7" },
    { img: require('../../assets/yoona.png'), id: "8" },
    { img: require('../../assets/yoori.png'), id: "9" },
    { img: require('../../assets/tayeon.png'), id: "10" },
    { img: require('../../assets/iu.png'), id: "11" },
    { img: require('../../assets/hoyeon.png'), id: "12" },
    { img: require('../../assets/seohyeon.png'), id: "13" },
    { img: require('../../assets/sooyeong.png'), id: "14" },
    { img: require('../../assets/sunny.png'), id: "15" },
    { img: require('../../assets/tiffany.png'), id: "16" },
    { img: require('../../assets/yoona.png'), id: "17" },
    { img: require('../../assets/yoori.png'), id: "18" },
  ]);
  return (
    <View style={styles.container}>
        <FlatList 
            data = {people}
            style={styles.wrapper}
            keyExtractor={(item) => item.id}
            numColumns={3}
            horizontal={false} // numColumn을 설정하기 위해서 horizontal=false설정
            renderItem={ // item은 위의 배열의 한줄한줄을 의미
                ({item}) =>(// onPress로 해당 게시물로 들어가기
                    <Pressable> 
                        <Image style={styles.imgstyle} source={item.img} />
                    </Pressable>
                )
            }
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 1,
        justifyContent: 'center'
    },
    wrapper:{
        marginHorizontal: 1,
        marginVertical:1,
        flex:1,
        display: 'flex'
    },
    imgstyle:{
        flex:0,
        width: window.width / 3 - 3,
        height: window.width / 3 - 3,
        borderRadius: 15,
        resizeMode:'cover',
        marginHorizontal: 1,
        marginVertical:1,

    }
})

export default MyPosts;
