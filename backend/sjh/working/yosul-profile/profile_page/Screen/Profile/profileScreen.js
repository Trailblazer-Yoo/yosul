import React, { Component,  useState, useEffect, } from 'react';
import {
  TextInput,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const profileScreen = () => {
  const options = ['탁주', '약주•청주', '과실주', '증류주', '리큐르/기타주류']

  renderInner = () => (
    <View style={styles.panel}>
      <View>
        <Text style={styles.panelTitle}>사진 업로드</Text>
        <Text style={styles.panelSubtitle}>프로필 사진을 선택하시오</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );


  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
      <ScrollView>
        <View style={styles.container}>
          <BottomSheet
            ref={this.bs}
            snapPoints={[330, 0]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            initialSnap={1}
            callbackNode={this.fall}
            enabledGestureInteraction={true}
            />
          <View style={styles.header}>
          </View>  
            <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}>     
            <View style={{
              justifyContent:'center',
              alignItems: 'center',
              marginTop: 30,
            }}> 
              <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                <ImageBackground 
            source={{uri: 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg'}}
            style={styles.image}
            imageStyle={{borderRadius: 15}}
              />
              </TouchableOpacity>
              <View style={{
                flex:1,
                justifyContent:'center',
                alignItems: 'center',
              }}>
                <Icon name="camera" size={35} color="black" style={{
                  opacity: 0.7,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 10,
                }} />
              </View>
            </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}> 
              <Text style={styles.question}>닉네임</Text>
              <TouchableOpacity style={styles.buttonContainer}>
                <TextInput
                style={styles.textInput}
                onChangeText={(text) => {this.setState({inputText: text})}}
                placeholder="닉네임을 입력해주세요"
                
              />
              </TouchableOpacity>
          <Text style={styles.question}>자기소개</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <TextInput
            style={styles.textInput}
            keyboardType ='multiline'
            onChangeText={(text) => {this.setState({inputText: text})}}
            placeholder="40자내로 자기소개를 작성해주세요"
          />
          </TouchableOpacity>
          <Text style={styles.question}>인스타그램</Text>
              <TouchableOpacity style={styles.buttonContainer}>
              <TextInput
            style={styles.textInput}
            onChangeText={(text) => {this.setState({inputText: text})}}
            placeholder="@"
          />
            </TouchableOpacity>
          <Text style={styles.question}>주량</Text>  
          <TouchableOpacity style={styles.buttonContainer}>
              <TextInput
            style={styles.textInput}
            onChangeText={(text) => {this.setState({inputText: text})}}
            placeholder="주량을 입력해 주세요"
          />
            </TouchableOpacity>
          <Text style={styles.question}>선호 주종</Text>  
           <TouchableOpacity style={styles.buttonContainer}> 
          <View style={{ flex:1, flexDirection: 'column', justifyContent: 'center'}}>
            <CustomPicker
            placeholder={'선호 주종을 선택해주시오'}
            options={options}
            onValueChange={value => {
              Alert.alert('선택된 주종', value || '선택해주시요')
            }}
        />
          </View>
          </TouchableOpacity>
          <Text style={styles.question}>선호 도수</Text>
          <TouchableOpacity style={styles.buttonContainer}>
          <TextInput
            style={styles.textInput}
            keyboardType = 'number-pad'
            onChangeText={(text) => {this.setState({inputText: text})}}
            placeholder="선호 도수를 입력해주세요"
          />
          </TouchableOpacity>
            <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
              <Text style={styles.panelButtonTitle}>프로필 작성 완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Animated.View>
      </View>
    </ScrollView>
  );    
};

export default profileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  body:{
    marginTop:10,
    backgroundColor:'white',
  },
  image: {
    height: 130, 
    width:130,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  buttonContainer: {
    marginTop:20,
    height:50,
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderColor: "#C0E8E0",
    borderWidth: 3,
    borderRadius:30,
    backgroundColor: "white",
  },
    textInput: {
    color: "grey",
    fontSize:17,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 250,
    borderRadius: 10,
    justifyContent: 'center',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#C0E8E0',
    alignItems: 'center',
    marginTop: 10,
  },
    panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  question: {
    paddingHorizontal: 10,
    width: 300,
    fontSize: 20,
    lineHeight: 19,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
    header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
    panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
    panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
});

