import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, Linking } from 'react-native';
import React from 'react';

export default function DictionaryDetailScreen({route}) {
    const item = route.params.item
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Image style={styles.img} source={{uri: item.img}} />
            <Text style={styles.header}>{item.name}</Text>
            <Text>분류: {item.category}</Text>
            <Text>주재료: {item.meterial}</Text>
            <Text>도수: {item.alc}</Text>
            <Text>용량: {item.size}</Text>
            <Text>도수: {item.alc}</Text>
            <Text>수상 내역: {item.awards}</Text>
            <Text>어울리는 음식: {item.pairing}</Text>
            <Text>양조장: {item.craft}</Text>
            <Text>주소: {item.address}</Text>
            <Text>전화번호: {item.tel}</Text>
            <Text onPress={() => Linking.openURL(item.homepage)}>홈페이지</Text>
            <Text>상세: {item.details}</Text>
            <Text>기타: {item.etc}</Text>
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
      fontSize: 30,
      marginBottom: 10
    },
    img: {
      flex:0.5,
      aspectRatio: 1.5, 
      resizeMode: 'contain',
      marginBottom: 10
    }
})