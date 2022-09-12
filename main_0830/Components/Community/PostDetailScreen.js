import { View, Text, Image, StyleSheet, Dimensions, StatusBar, FlatList, Button, TextInput,TouchableOpacity, Modal, TouchableWithoutFeedback, Pressable, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider, SocialIcon } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
//import firebase from '../../firebase';
import post, { POSTS } from '../../data/post'
// const db = firebase.firestore()
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


const PostDetailScreen = ({ post }) => {
    const handleLike = post => {
        const currentLikeStatus = !post.likes_py_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_py_users: currentLikeStatus
                    ? firebase.firestore.FieldValue.arrayUnion(
                        firebase.auth().currentUser.email
                    )
                    
                    : firebase.firestore.FieldValue.arrayRemove(
                        firebase.auth().currentUser.email
                    ),
            })
            .then(() => {
                console.log('Document successfully updated!')
            })
            .catch(error => {
                console.log('Error updating document', error)
            })

    }
    return (
        <View style={{ 
            flex: 1/2, marginBottom: 30 }}>
            <Divider width={2} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
                <View style={{ marginHorizontal: 9, marginTop: 10 }}>
                    <PostFooter post={post} />
                    <Like post ={post}/>
                    <Caption post={post} />
                    {/* <Tag post={post} /> */}
                    <Comment post={post} />
                </View>
        </View>
    )
}

const PostImage = ({ post }) => (
    <SafeAreaView style={{flex:1}}>
        <View style={{flex:1, width: "100%", height: 500, marginTop: 3, flexDirection:"row"}}>
            <View style={{flex:1, flexDirection:"row"}}>
                {post.imageUrl.map((imageUrls, index) =>
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
        </View>
    </SafeAreaView>
);


const Like = ({ post }) => (
    <View style={{marginTop: 3}}>
            <View style={{ flexDirection: 'row', width:"100%", marginLeft: -7 }}>
                <Image source={{ uri: [post.profile_picture][0]}} style={styles.stories} />

                <Text style={{ color: 'black', marginLeft: 10, marginTop: 2 }}>
                    <Text>{[post.comment]} theqazman외</Text> 
                    <Text>{post.comments.length-1}명이 좋아합니다</Text>
                </Text>
            </View>
    </View>
);

const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3,
        alignItems: 'center',
        width: "100%",
        height: 35,
        marginBottom: 3,
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
    <View style={{ flexDirection: 'row'}}>
        <Text style={{ color: 'black' }}>
        <Text style={{ color: 'black', marginLeft: 5, fontWeight: '700' }}>
                    {post.user}
        </Text>{' '}
            <Text style={{fontSize: 13}}>{post.caption} </Text>
        </Text>
    </View>
)

const Comment = ({ post }) => (
    <View style={{marginTop: 5}}>
        {!!post.comments.length && (
        <Text style={{ color:'grey', marginBottom: 3}}>
            댓글 {post.comments.length}
            {post.comments.length > 1 ? '개' : ' '}{post.comments.length > 1 ? ' 모두 보기' : '보기'}
        </Text>)}
        {post.comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: 'row', width:"92%", marginLeft: -7 }}>
                <Image source={{ uri: post.profile_picture }} style={styles.stories} />
                <Text style={{ color: 'black', marginLeft:5 }}>
                    <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
                    {comment.comment}
                </Text>
                <TouchableOpacity style={{ position: 'absolute', right: -43, top: 3}}>
                    <AntDesign 
                        name={"hearto"} 
                        size={15}
                        color={"black"}
                     />
                </TouchableOpacity>
            </View>
        ))}
        <Text style= {{color:'grey', fontSize: 12, marginTop: 5}}>{post.date}</Text>
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
            </View>
        </View>
    )


const PostFooter = ({ post }) => (   
    <View style={{ flexDirection: 'row'}}>
        <View style={styles.lefeFooterIconsContainer}>
            <View style ={styles.box}>
                <TouchableOpacity>
                    <AntDesign 
                        name={"heart"} 
                        size={20}
                        color={"#FF3E3E"}
                     />
                </TouchableOpacity>
            </View>
            <View style = {styles.box}>
                <TouchableOpacity>
                    <SimpleLineIcons name="bubble" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style = {{ position: 'absolute', left: 370}}>
                <TouchableOpacity>
                    <FontAwesome name="bookmark-o" size={20} color="black" />
                </TouchableOpacity>
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
    stories: {
        width: 20,
        height: 20,
        borderRadius: 50,
        marginLeft: 6,
        marginTop: 2,
        marginBottom: 2
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    lefeFooterIconsContainer: {
        flexDirection: 'row',
        width: "15%",
    },
    box: {
        flex: 1,
        flexDirection: "row",
    },
    picturenum: {
        position: 'absolute'
    }
})

export default PostDetailScreen