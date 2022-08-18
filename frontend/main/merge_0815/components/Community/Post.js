import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
// import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements';
import { AntDesign, Feather, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
// import firebase from '../../firebase';
import post from '../../data/post'

// const db = firebase.firestore()

const Post = ({ post }) => {
    // const handleLike = post => {
    //     const currentLikeStatus = !post.likes_py_users.includes(
    //         firebase.auth().currentUser.email
    //     )

    //     db.collection('users')
    //         .doc(post.owner_email)
    //         .collection('posts')
    //         .doc(post.id)
    //         .update({
    //             likes_py_users: currentLikeStatus
    //                 ? firebase.firestore.FieldValue.arrayUnion(
    //                     firebase.auth().currentUser.email
    //                 )
    //                 : firebase.firestore.FieldValue.arrayRemove(
    //                     firebase.auth().currentUser.email
    //                 ),
    //         })
    //         .then(() => {
    //             console.log('Document successfully updated!')
    //         })
    //         .catch(error => {
    //             console.log('Error updating document', error)
    //         })
    // }
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={2} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter post={post} />
                {/* <Tag post={post} /> */}
                <Likes post={post} />
                <Caption post={post} />
                <CommentsSection post={post} />
                <Comment post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center',
    }}>
        <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: post.profile_picture }} style={styles.story} />
                <Text style={{ color: 'black', marginLeft: 5, fontWeight: '700' }}>
                    {post.user}
                </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={{ color: 'black', fontWeight: '900', margin: 10, }}>...</Text>
        </TouchableOpacity>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: "100%", height: 450 }}>
        <Image
            source={{ uri: post.imageUrl }}
            style={{ height: "100%", resizeMode: "cover" }}
        />
    </View>
);


const PostFooter = ({ post }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.lefeFooterIconsContainer}>
            {/* 하트 */}
            <TouchableOpacity>
                <AntDesign name="hearto" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <SimpleLineIcons name="bubble" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesome name="bookmark-o" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Feather name="share-2" size={24} color="black" />
            </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'flex-end', justifyContent: 'center', }}>
            <Text>{post.date}</Text>
        </View>
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

// 내용 어느정도 이상 넘어가면 펼치기로 하기!
const Caption = ({ post }) => (
    <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'black' }}>
            <Text style={{ fontWeight: '600' }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const Likes = ({ post }) => (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
        <Text style={{ color: "black", fontWeight: "600" }}>
            {post.likes.toLocaleString("en")} likes
        </Text>
    </View>
);

const CommentsSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: 'gray' }}>
                View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )}
    </View>
)

const Comment = ({ post }) => (
    <>
        {post.comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ color: 'black' }}>
                    <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    shareIcon: {
        transform: [{ rotate: '320deg' }],
        marginTop: -3,
    },
    lefeFooterIconsContainer: {
        flexDirection: 'row',
        width: "32%",
        justifyContent: 'space-between'
    }
})

export default Post