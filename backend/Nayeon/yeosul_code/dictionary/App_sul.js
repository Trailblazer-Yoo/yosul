import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from "react";
import firebase  from './firebase';

const deviceWidth = Dimensions.get('window').width;

export default function App() {
  const [loading, setLoading] = useState("");
  const [sulList, setSulList] = useState({});
  const sulCollection = firebase.collection("sool_test");
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
    setLoading("전통주 사전");
    console.log(dataSnapShot);
  }

  useEffect(() => {
    getFsvDocs();
  }, []);

  const renderListItem = ({ item, index }) => {
    return (
      <View style={styles.listContainer}>
        <Image style={styles.img} source={{uri: item.img}} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.category}</Text>
        <Text style={styles.material}>{item.meterial}</Text>
        <Text style={styles.alcohol}>{item.alc}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>{ loading }</Text>
      </View>
        {loading === "" ? (
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
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'   
  },
  headerText: {
    color: "black",
    fontSize: 28,
    fontWeight: "500"
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    width: deviceWidth-20,
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
