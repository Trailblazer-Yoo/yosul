import React, { Component } from "react";
import PostDetailScreen from "../Components/Community/PostDetail";
import firebase from '../firebase';
import { StyleSheet, TouchableOpacity, Image, Text, View, SafeAreaView, ScrollView, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { POSTS } from '../data/post'; 

const db = firebase.firestore()

const CommunityDetailScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collectionGroup('posts')
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, [])
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.inner}>
            {POSTS.map((post) => (
                <PostDetailScreen 
                post={post}/>
              ))}
      </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex : 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  inner: {
    flex: 1
  },
})

export default CommunityDetailScreen