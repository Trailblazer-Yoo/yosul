import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";

const Stack = createStackNavigator();

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  React.useEffect(() => {
    if (route.params?.head) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.head]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Title: {route.params?.head}</Text>
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postTitle, setPostTitle] = React.useState("");
  const [postText, setPostText] = React.useState("");
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <>
      <TextInput
        title="제목"
        placeholder="제목을 입력하세요"
        style={{
          height: 50,
          padding: 10,
          backgroundColor: "white",
          marginTop: 55,
          marginBottom: 50,
        }}
        value={postTitle}
        onChangeText={setPostTitle}
      />
      <TextInput
        title="내용"
        multiline
        placeholder="내용을 입력하세요"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <>
        <Button
          style={{ height: 200, padding: 10, backgroundColor: "white" }}
          title="사진 선택"
          onPress={pickImage}
        />
      </>
      <>
        <Button
          title="Done"
          onPress={() => {
            // Pass params back to home screen
            navigation.navigate("Home", { head: postTitle });
            navigation.navigate("Home", { post: postText });
          }}
        />
      </>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        {/* initialRouteName : 맨처음 보여줄 화면이름 */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "커뮤니티" }} // 각 화면 타이틀(헤더에 렌더링됨)
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ title: "글쓰기" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "##c0e8e0",
    alignItems: "center",
    justifyContent: "center",
  },
});
