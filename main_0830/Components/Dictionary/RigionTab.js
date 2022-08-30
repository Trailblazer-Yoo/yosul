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

const RegionTab = () => {
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
        name="Seoul"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              서울특별시
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="GyeongGi"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              경기도
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Incheon"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              인천광역시
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Gangwon"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              강원도
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ChungcheongNam"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{ fontSize: focused ? 15 : 15,
                    fontWeight: focused ? '800' : '100' }}
            >
              충청남도
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RegionTab;
