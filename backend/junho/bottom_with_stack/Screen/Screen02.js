import React from "react";
import { StyleSheet, Text, View } from 'react-native';

function Screen02(){
    return (
        <View style={styles.container}>
            <Text>I am screen02</Text>
        </View>
    )
}


export default Screen02
  

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
