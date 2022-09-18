import { SafeAreaView, FlatList } from 'react-native';
import Post from '../Components/Community/Post'
import React, { useEffect, useState } from 'react';
import firebase from '../firebase'

const db = firebase.firestore()

const CommunityScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collectionGroup('posts')
    // .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, [])

  const renderPosts = (itemData) => {
    return <Post posts ={itemData.item} navigation={navigation}/>;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
          data={posts}
          renderItem={renderPosts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{ margin: 3 , backgroundColor:'#fff' }}
            />
    </SafeAreaView>
  )
}

export default CommunityScreen