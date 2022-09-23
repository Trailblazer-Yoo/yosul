import { View, Text } from 'react-native'
import React from 'react'
import FindPassword from '../Components/Login/FindPassword'

const FindPasswordScreen = ({navigation}) => {
  return (
    <View>
      <FindPassword navigation={navigation} />
    </View>
  )
}

export default FindPasswordScreen