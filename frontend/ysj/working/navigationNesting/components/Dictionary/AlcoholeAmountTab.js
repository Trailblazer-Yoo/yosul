import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>넣을 화면</Text>
    </View>
  );
}

const AlcoholAmountTab = () => {
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
        name="1"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 15 : 15,
                fontWeight: focused ? "700" : "100",
                padding: 5,
              }}
            >
              0-10
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="2"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 15 : 15,
                fontWeight: focused ? "700" : "100",
                padding: 5,
              }}
            >
              10-20
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="3"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 15 : 15,
                fontWeight: focused ? "700" : "100",
                padding: 5,
              }}
            >
              20-30
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="4"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 15 : 15,
                fontWeight: focused ? "700" : "100",
                padding: 5,
              }}
            >
              30-40
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="5"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: focused ? 15 : 15,
                fontWeight: focused ? "700" : "100",
                padding: 5,
              }}
            >
              50 이상
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AlcoholAmountTab;
