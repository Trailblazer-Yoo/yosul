import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation}) {
    const alpha = [['a',1],['b',2],['c',3]]

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
            {/* header */}
            <TouchableOpacity>
                <Text style={styles.btnText}>hi?</Text>
            </TouchableOpacity>
            <Text>Title</Text>
            <TouchableOpacity>
                <Text style={styles.btnText}>hi??</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('Profile')}
        >
            <Text style={styles.inner}>개인정보</Text>
        </TouchableOpacity>
        

        {/* <TouchableOpacity style={styles.container}
            onPress={() => navigation.navigate('Friend')}
        >
            <Text style={styles.inner}>술친구 관리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container}
            //onPress={() => navigation.navigate('Friend')}
        >
            <Text style={styles.inner}>업적</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container}
            //onPress={() => navigation.navigate('Friend')}
        >
            <Text style={styles.inner}>게시물 다시보기</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.container}
            //onPress={() => navigation.navigate('Friend')}
        >
            <Text style={styles.inner}>즐겨찾기한 전통주</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.container}
            //onPress={() => navigation.navigate('Friend')}
        >
            <Text style={styles.inner}>내가 작성한 글</Text>
        </TouchableOpacity>
        <View style={{flex:10}}></View>
      </View>
    );
}

// another Screen import file
function ProfileScreen({navigation}){
    return (
        <ScrollView style={{flex:1}}>
            <View style={{flex:1,alignItems: "center",marginTop:30}}>
                <Image style={{ width: 150, height: 150 }}
                    source={require('./cat01.jpeg')}/>
                <View style={{marginTop:10}}>
                    <Button title="프로필 사진 변경"/>
                </View>
            </View>
            <View style={{flex:1}}>
                <View style={styles.profile_container}>
                    <Text style={styles.profile_title_txt}>닉네임</Text>
                    <Text style={styles.profile_contents_txt}>고양이</Text>
                </View>
                <View style={styles.profile_container}>
                    <Text style={styles.profile_title_txt}>주량</Text>
                    <Text style={styles.profile_contents_txt}>츄르 1잔</Text>
                </View>
                <View style={styles.profile_container}>
                    <Text style={styles.profile_title_txt}>지역</Text>
                    <Text style={styles.profile_contents_txt}>지붕</Text>
                </View>
            </View>
            <View style={{flex:1}}>

            </View>
        </ScrollView>
        
)}

function FriendScreen({navigation}){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Friend!</Text>
        </View>
)}

function Screen02(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} title='home'
                options={{
                    title:'Home',
                    headerShown:false,
                    }}/>

            <Stack.Screen name="Profile" component={ProfileScreen} title='Profile'
                options={{
                    title:'Profile',                    
                    }}/>

            <Stack.Screen name="Friend" component={FriendScreen} title='Friend'
                options={{
                    title:'Friend',                    
                    }}/>
        </Stack.Navigator>
    )
}


export default Screen02
  

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingHorizontal:50,
    alignItems: "center",
    justifyContent: 'center',
    marginTop:3,
    padding:30,
    backgroundColor:'white',
    borderBottomWidth:1
},
inner: {
    color:'blue',
    fontSize:15,
  },
profile_title_txt:{
    marginLeft:30,
    marginTop:10
},
profile_contents_txt:{
    marginLeft:50,
    marginTop:20
},
profile_container:{
    flex:2,
},
header:{
    marginTop:50,
    paddingHorizontal:20,
    marginBottom:10,
    justifyContent:'space-between',
    flex:1,
    flexDirection:'row'
},
btnText:{
    fontSize:40,
    fontWeight:'200'
}

});
