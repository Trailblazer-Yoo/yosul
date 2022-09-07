import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Pressable, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
//import firebase from '../../firebase';
import post, { POSTS } from '../../data/post'
// const db = firebase.firestore()
import ImageView from "react-native-image-viewing";
import { useNavigation } from '@react-navigation/native';
import ImageModal from 'react-native-image-modal';
import {PostDetailScreen} from './PostDetailScreen';

  
const Post = ({ post, navigation }) => {
    return (
        <View style={{ flex: 1/2, marginBottom: 30 }}>
            <Divider width={2} orientation='vertical' />
            <PostImage post={post} navigation = {navigation}/>
            <PostHeader post={post}/>
                <View style={{ marginHorizontal: 9, marginTop: 10 }}>
                    <Caption post={post} />
                    {/* <Tag post={post} /> */}
                    <PostFooter post={post} />
                </View>
        </View>
    )
}

const PostImage = ({ post, navigation }) => (
    <View style={{flex:1, width: "99%", height: 300, marginTop: 3 }}>
        <TouchableOpacity onPress={() => navigation.push("CommunityDetailScreen")}>
            <View>
                <Image
                    style={{
                    width: "100%",
                    height: 300,
                    borderRadius: 10,
                    }}
                    source={{
                    uri: post.imageUrl.toLocaleString()}}/>
            <View style={{position:'absolute', top: 10, right: 5, borderRadius: 20, backgroundColor:'#5d5e5d', opacity:0.6, width: 35, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{color: 'white', alignItems: 'center', justifyContent: 'center'}}>1/{post.imageUrl.length}</Text> 
                </View>
            </View>
        </TouchableOpacity>
    </View>
);


const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3,
        alignItems: 'center',
        width: "100%",
        height: 25,
        marginBottom: 3
    }}>
        <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: post.profile_picture }} style={styles.story} />
                <Text style={{ color: 'black', marginLeft: 5, fontWeight: '700' }}>
                    {post.user}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
)


// const Tag = ({ post }) => (
//     <View style={{ flexDirection: 'row', marginTop: 15 }}>
//         {post.tag.map((tag, index) => (
//             <View key={index}>
//                 <Text style={{ color: 'black' }}>
//                     <Text style={{
//                         backgroundColor: "#c0e8e0",
//                     }}>
//                         {'#'}{tag}</Text>{'  '}
//                 </Text>
//             </View>
//         ))}
//     </View >
// )

const Caption = ({ post }) => (
    <View style={{ position: 'absolute', bottom: 25, left: 1, flexDirection: 'row'}}>
        <Text style={{ color: 'black' }}>
            <Text style={{fontSize: 12}}>{post.caption.slice(0,24)} </Text>
            <Text style={{fontSize:12, color: 'grey'}}> ... 더 보기 </Text>
        </Text>
    </View>
)

const PostFooter = ({ post }) => (   
    <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <View style={styles.lefeFooterIconsContainer}>
            <View style ={styles.box}>
                <TouchableOpacity>
                    <AntDesign 
                        name={"heart"} 
                        size={20}
                        color={"#FF3E3E"}
                     />
                </TouchableOpacity>
                    <Text style={{ color: "black", fontWeight: '350', marginLeft: 5 }}>
                        {post.likes.toLocaleString("en")}
                    </Text>
            </View>
            <View style = {styles.box}>
                <TouchableOpacity>
                    <SimpleLineIcons name="bubble" size={20} color="black" />
                </TouchableOpacity>
                    <Text style={{ color: "black", fontWeight: '350', marginLeft: 5}}>{post.comments.length}</Text>
            </View>
            <View style = {styles.box}>
                <TouchableOpacity style={{position:'absolute', left: -22}}>
                    <FontAwesome name="bookmark-o" size={20} color="black" />
                </TouchableOpacity>
                    <Text style={{ color: "black", fontWeight: '350'}}>3</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    story: {
        width: 25,
        height: 25,
        borderRadius: 50,
        marginLeft: 6,
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    lefeFooterIconsContainer: {
        flexDirection: 'row',
        marginTop: 3,
        width: "100%",
    },
    box: {
        flex: 1,
        flexDirection: "row",
    },
    picturenum: {
        position: 'absolute'
    }
})

export default Post