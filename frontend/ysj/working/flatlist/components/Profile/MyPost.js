import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const MyPosts = () => {
  const [people, setPeople] = useState([
    { name: "shaun", id: "1" },
    { name: "yoshi", id: "2" },
    { name: "mario", id: "3" },
    { name: "luigi", id: "4" },
    { name: "peach", id: "5" },
    { name: "toad", id: "6" },
    { name: "shuan", id: "7" },
  ]);
  return (
    <View style={styles.container}>
        <FlatList 
            data = {people}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={3}
            renderItem={ // item은 위의 배열의 한줄한줄을 의미
                ({item}) =>(
                    <Text style={styles.item}>{item.name}</Text>
                )
            }
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 3,
        paddingHorizontal: 20
    },
    item:{
        padding: 30,
        backgroundColor: 'pink',
        fontSize: 24,
        marginHorizontal: 1,
        marginVertical:1 
    }
})

export default MyPosts;