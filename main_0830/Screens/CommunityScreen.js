import { StyleSheet, TouchableOpacity, Image, Text, View, SafeAreaView, ScrollView, FlatList, Pressable } from 'react-native';
import Post from '../Components/Community/Post'
import { useEffect, useState } from 'react';
import { POSTS } from '../data/post'; 
import firebase from '../firebase'

const db = firebase.firestore()

const CommunityScreen = ({navigation}) => {
  const renderPosts = (itemData) => {
    return <Post post ={itemData.item} />;
  };

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
      <FlatList
          data={POSTS}
          renderItem={renderPosts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{ margin: 3 }}
            />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex :1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  box: {
    width: '50%',
    height: '50%',
    padding: 5
  },
  inner: {
    flex: 1/2
  },
})

export default CommunityScreen