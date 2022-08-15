import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import { StatusBar, Text, View } from "react-native";
import AlcoholTypeTab from '../Components/Dictionary/AlcoholeTypeTab';
import RegionTab from '../Components/Dictionary/RigionTab';
import AlcoholAmountTab from '../Components/Dictionary/AlcoholeAmountTab';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>넣을 화면</Text>
      </View>
    );
  }

const DictionaryScreen = () => {
  return (
    <Tab.Navigator
    screenOptions={() => ({
      swipeEnabled: false,
      adaptive: true,
      tabBarIndicatorStyle:{
        backgroundColor:'white',
    },
    tabBarLabelStyle: {
      fontSize: 17,
      fontWeight: '700',
    },
    
    })}
      style={{paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : StatusBar.currentHeight}}>
      <Tab.Screen
      name="우리술"
      component={AlcoholTypeTab}
      
      />
      <Tab.Screen name="지역" component={RegionTab} />
      <Tab.Screen name="도수" component={AlcoholAmountTab} />
    </Tab.Navigator>
  );
}

export default DictionaryScreen