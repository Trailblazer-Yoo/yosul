import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Header from '../Components/Community/Header';
// import Stories from '../components/Community/Stories';
import Post from '../Components/Community/Post'
import { useEffect, useState } from 'react';
import { POSTS } from '../data/post';
// import firebase from '../firebase'

// const db = firebase.firestore()

const CommunityScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])

  // useEffect(() => {
  //   db.collectionGroup('posts')
  //   .onSnapshot(snapshot => {
  //     setPosts(snapshot.docs.map(post => (
  //       {id: post.id, ...post.data()})))
  //   })
  // }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView>
        {POSTS.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex: 1,
  }
})

export default CommunityScreen