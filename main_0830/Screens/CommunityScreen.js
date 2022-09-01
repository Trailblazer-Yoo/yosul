import { StyleSheet, TouchableOpacity, Image, Text, View, SafeAreaView, ScrollView, FlatList, Pressable } from 'react-native';
import Post from '../Components/Community/Post'
import { useEffect, useState } from 'react';
import { POSTS } from '../data/post';
import firebase from '../firebase'

const db = firebase.firestore()

const CommunityScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collectionGroup('posts')
    .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post => (
        {id: post.id, ...post.data()})))
    })
  }, [])
  return (
    <SafeAreaView style={styles.safecontainer}>
      <ScrollView>
        {POSTS.map((post, index) => (
            <Post post={post} key={index}/>
          ))}
      </ScrollView> 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safecontainer: {
    flex :1
  },
  container: {
    backgroundColor:"white",
    flex: 1,
    flexDirection: "row",
    widht: '100%',
    heigh:'85%',
    flexWrap:'wrap'
  },
  box: {
    width: '50%',
    height: '50%',
    padding: 5
  },
  inner: {
    flex: 1
  }
})

export default CommunityScreen