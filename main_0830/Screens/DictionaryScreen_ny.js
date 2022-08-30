import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import firebase  from '../firebase';

export default function DictionaryScreen_ny({navigation}) {
  const [loading, setLoading] = useState(false);
  const [sulList, setSulList] = useState({});
  const sulCollection = firebase.firestore().collection("sool_test");
  const getFsvDocs = async () => {
    const dataSnapShot = (await sulCollection.doc("init").get()).data();
    const dataCols = Object.keys(dataSnapShot);
    const sulName = dataSnapShot['name'];
    const data = [];
    for (let i = 0; i < sulName.length; i++) {
      let temp = {};
      dataCols.map(x => temp[x] = dataSnapShot[x][i]);
      data.push(temp);
    }
    setSulList(data);
    setLoading(true);
    // console.log(dataSnapShot);
  };

  useEffect(() => {
    getFsvDocs();
  }, []);

  const renderListItem = ({ item, index }) => {
    return (
      <TouchableOpacity 
        style={styles.listContainer} 
        onPress = {() => navigation.push('DictionaryDetailScreen', {'id': index, 'item': item})}>
        <Image style={styles.img} source={{uri: item.img}} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>분류: {item.category}</Text>
        <Text style={styles.material}>주재료: {item.meterial}</Text>
        <Text style={styles.alcohol}>도수: {item.alc}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        {loading === false ? (
          <View style={styles.loading}>
            <ActivityIndicator color="grey" style={{marginTop: 10}} size="large" />
          </View>
          ) : (
          <FlatList 
            data={sulList}
            renderItem={renderListItem}>
          </FlatList>
        )}
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
  item: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    width: Dimensions.get('window').width-20,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    color: "grey",
    backgroundColor: "white",
  },
  img: {
    flex:1,
    aspectRatio: 1.5, 
    resizeMode: 'contain',
    marginBottom: 10
  },
  name: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  type: {
    color: "black",
    fontSize: 15
  },
  material: {
    color: "black",
    fontSize: 15
  },
  alcohol: {
    color: "black",
    fontSize: 15
  },
});
