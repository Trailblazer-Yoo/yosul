import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import db from './firebase';
import React, { useEffect, useState } from 'react';

export default function App() {
  //const [data,setData] = useState('');

//   useEffect(()  =>  {
//     db
//     .collection("sool")
//     .doc('0')
//     .get()
//     .then(function(doc) {
//       if (doc.exists) {
//           // setCurrentPost(doc.data());
//           return setData(doc.data());
//       } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//       }
//     })
//     .catch(function(error) {
//       console.log("Error getting document:", error);
//   }), []
// })

  // var soolList = db.collection('sool')
  // var allsool = soolList.get().then(snapshot => {
  //   snapshot.forEach(doc => {
  //     return doc.data();
  //   })
  // })

  
  //console.log(allsool)

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
