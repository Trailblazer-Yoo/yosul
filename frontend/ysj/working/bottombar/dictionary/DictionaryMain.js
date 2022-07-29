import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Button } from "react-native";

import DetailScreen from "./DetailScreen";
import HomeScreen from "./HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function DictionaryMain() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route, navigation }) => ({
            title: `현재 페이지 번호 : ${route.params.id}`,
            headerRight: () => (
              <View>
                <Button
                  title="다음"
                  onPress={() =>
                    navigation.push("Detail", { id: route.params.id + 1 })
                  }
                />
                <Button
                  title="이전"
                  onPress={() => navigation.pop()} />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
  );
}
