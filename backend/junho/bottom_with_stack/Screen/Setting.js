import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Screen02 from "./Screen02";

const Tab = createMaterialTopTabNavigator();

function FixScreen({navigation}){
    <View>
        <Text>Fix!</Text>
    </View>
}


// function FixScreen({navigation}) {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen
//             name='Home'
//             component={Screen02}
//             />
//         </Tab.Navigator>
//     );
//   }

export default FixScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
