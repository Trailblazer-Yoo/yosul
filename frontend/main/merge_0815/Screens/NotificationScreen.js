import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, FlatList } from "react-native";
import firebase from "../firebase";

const db = firebase.firestore();

export default function NotificationScreen({ navigation }) {
    const [likes, setLikes] = useState([]);
    const usersCollection = firebase.firestore().collection("users");
    const currentUserEmail = firebase.auth().currentUser.email;
    const postCollection = usersCollection.doc(currentUserEmail).collection("posts");

    const getLikes = () => {
        postCollection.onSnapshot((snapshot) => {
                        setLikes(snapshot.docs.map((post) => ({ id: post.id, caption: post.data()['caption'], likesByUsers: post.data()['likes_by_users'], cnt: post.data()['likes_by_users'].length })));
                        });
    }

    useEffect(() => {
        getLikes();
    }, [postCollection])

    const renderItem = ({item, index}) => {
        return (
            <View>
                {item.cnt === 0 ? null : (
                    <View>
                        <Text>{item.caption}이 좋아요를 받았습니다.</Text>
                        <Text>좋아요 수: {item.cnt}</Text>
                    </View>
                )}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={likes}
                renderItem={renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
});