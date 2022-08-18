import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import CommunityScreen from '../Screen/CommunityScreen';
import MapScreen from '../Screen/MapScreen';
import DictionaryScreen from '../Screen/DictionaryScreen';
import profileMainScreen from "../Screen/Profile/profileMainScreen";
import profileScreen from "../Screen/Profile/profileScreen";
import savedsul from "../Screen/Profile/savedsul";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="메인화면" component={HomeScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityScreen} />
      <Tab.Screen name="지도" component={MapScreen} />
      <Tab.Screen name="우리 술 사전" component={DictionaryScreen} />
      <Tab.Screen name="나의 프로필" component={profileMainScreen} />
      </Tab.Navigator>
  );
}

export default Tabs;