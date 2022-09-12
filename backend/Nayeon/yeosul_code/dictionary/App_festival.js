import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions, Linking } from 'react-native';
import React, { useState, useEffect } from "react";
import firebase  from './firebase';

const deviceWidth = Dimensions.get('window').width;

export default function App() {
  const [loading, setLoading] = useState("");
  const [fsvlList, setFsvlList] = useState({});
  const fsvlCollection = firebase.collection("festival_test");
  const getFsvDocs = async () => {
    const dataSnapShot = (await fsvlCollection.doc("init").get()).data();
    const dataCols = Object.keys(dataSnapShot);
    const fsvlName = dataSnapShot['fstvlNm'];
    const data = [];
    for (let i = 0; i < fsvlName.length; i++) {
      let temp = {};
      dataCols.map(x => temp[x] = dataSnapShot[x][i]);
      data.push(temp);
    }
    setFsvlList(data);
    setLoading("지역축제 사전");
  }

  useEffect(() => {
    getFsvDocs();
  }, []);

  const renderListItem = ({ item, index }) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.name}>{item.fstvlNm}</Text>
        <Text style={styles.start}>{item.fstvlStartDate}</Text>
        <Text style={styles.end}>{item.fstvlEndDate}</Text>
        <Text style={styles.manage} onPress={() => Linking.openURL(item.homepageUrl)}>{item.mnnst}</Text>
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
            data={fsvlList}
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
  name: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  start: {
    color: "black",
    fontSize: 15
  },
  end: {
    color: "black",
    fontSize: 15
  },
  url: {
    color: "black",
    fontSize: 15
  },
  manage: {
    color: "black",
    fontSize: 15
  }
});
