import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import firebase from "../../firebase";

const { width, height } = Dimensions.get("screen");
const db = firebase.firestore()

export function PostDetail({ route, navigation }) {
  const post = route.params.item;
  const date = new Date(post.createdAt.seconds * 1000);
  console.log("포스트", post);
  console.log(date);
  console.log(post.imageArray[0])

  return (
    <ScrollView style={styles.postContainer}>
      <View style={styles.postUserData}>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: post.profile_picture }}
              style={{ width: 30, height: 30 }}
              borderRadius={50}
            />
            <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 10 }}>
              {post.nickname}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex:1,height:height*0.5, justifyContent:'center', alignItems:'center'}}>
        {/* <View style={{flex:1, width: "100%", height: 500, marginTop: 3, flexDirection:"row"}}>
            <View style={{flex:1}}>
                {post.imageArray.map((imageUrls, index) =>
                <Image
                    key={index}
                    style={{
                    width: "100%",
                    height: "33.5%",
                    resizeMode: 'contain'
                    }}
                    source={{
                    uri: imageUrls}}/>)}
            </View>
        </View> */}
        {/* <Image style={{resizeMode:'cover'}} source={{uri : post.imageArray[0]}}/> */}
        <FlatList
          data={post.imageArray}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          renderItem={({item, index}) => {
            <Image
              key={index}
              source={{ uri: item }}
              style={{
                width: width*0.5,
                height: width * 1.41*0.5,
                resizeMode: "cover",
              }}
            />;
          }}
        />
      </View>
      <View style={styles.postOptionsContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            {/* <Ionicons
                name={post.likes_by_users.includes(post.eamil) ? "heart" : "heart-outline"}
                size={27}
                color={props.post.liked ? "#FF3E3E" : "black"}
                style={{ marginRight: 10 }}
              /> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <FontAwesome name="bookmark-o" size={25} style={{ marginRight: 5 }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.likesViewContainer}>
        {post.likes_by_users.map((user) => {
            return (
              <Image
                source={{ uri: user.profile_picture }}
                style={styles.likesPic}
                borderRadius={50}
              />
            );
          })}
        <Text style={{ fontSize: 14, marginLeft: 5 }}>
          Liked by{" "}
          <Text style={{ fontWeight: "700" }}>
              {post.likes_by_users.length} and others
            </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.commentsContainer}>
          {post.comments.map((comment) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Text style={{ fontWeight: "700" }}>{comment.username}</Text>
                <Text style={{ marginLeft: 5 }}>{comment.comment}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      <Text
        style={{
          fontSize: 12,
          color: "#777",
          fontWeight: "500",
          marginLeft: 15,
          marginTop: 5,
        }}
      >
        {date.getMonth()}.{date.getDate()}
      </Text>
      <View style ={{flexDirection: 'row', marginTop: 7, marginLeft: -7}}>
          <Image source={{ uri: post.profile_picture }} 
                  style={{
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  marginLeft: 6,
                  marginTop: 5,
                  marginRight: 8}}/>
              <TextInput placeholder='댓글을 입력하시오'/>
                <TouchableOpacity
                    style={styles.buttonDesign}>
                      <Text
                        style={{
                          fontSize: 10,
                          marginTop: 5
                        }}>
                      댓글 게시
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
            );
          }

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor:'#fff',
  },
  postUserData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    height: width * 0.12,
  },
  postOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: width * 0.2,
    marginHorizontal: 10,
  },
  likesViewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20,
  },
  likesPic: {
    width: 20,
    height: 20,
    marginLeft: -5,
    borderWidth: 1,
    borderColor: "white",
  },
  commentsContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
    marginTop: 4,
  },
  buttonDesign: { 
    borderRadius: 20, 
    backgroundColor:"#c0e8e0", 
    width: 30, 
    justifyContent: 'center', 
    alignItems:'center',

  }
});

export default PostDetail;
