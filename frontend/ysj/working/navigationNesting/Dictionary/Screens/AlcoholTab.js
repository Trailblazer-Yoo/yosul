import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import AlcoholDetails from "./DetailScreens/AlcoholDetails";
import AlcoholList from "./DetailScreens/AlcoholMain";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>넣을 화면</Text>
    </View>
  );
}

const AlcoholScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        backBehavior: "history",
        tabBarScrollEnabled: true, // 탭들을 휴대폰 화면이 넘어가도 드래그해서
        adaptive: true, // 휴대폰 화면에 맞춰서 정렬
        tabBarBounces: true,
        swipeEnabled: true, // 옆 화면으로 전환하는 옵션
        // gesturesEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarItemStyle: { width: 100 },
      })}
    >
      <Tab.Screen
        name="li"
        component={AlcoholList}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              과실주
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="sprits"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              증류주
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="b"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              탁주
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="c"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              청주
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="d"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              기타
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AlcoholScreen;
