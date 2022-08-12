import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function HomeScreen({ navigation, route }) {
    React.useEffect(() => {
      if (route.params?.post) {
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
      }
    }, [route.params?.post]);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      </View>
    );
}

function DetailsScreen({ route, navigation }) {
    const { itemId, otherParam } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  
function Screen01({navigation}){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} title='home'
                options={{
                    title:'Home',
                    headerShown:false,
                    }}/>
            <Stack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }}/>
        </Stack.Navigator>
        // <View style={styles.container}>
        //     <Text>I am screen01</Text>
        //     <Button
        //         title="Details"
        //         onPress={() => navigation.navigate('Details')}
        //     />
        // </View>
    )
}


export default Screen01
  

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
