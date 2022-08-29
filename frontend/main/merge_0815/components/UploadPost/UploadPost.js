import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import validUrl from "valid-url";
import firebase from "../../firebase";

const db = firebase.firestore();
const window = Dimensions.get("screen");

const PLACEHOLDER_IMG =
  "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";

// 허용된 것과 허용되지 않은 것들
const uploadPostSchema = Yup.object().shape({
  tags: Yup.array().max(3, "태그는 3개까지 가능합니다."),
  caption: Yup.string().max(2200, "본문은 2200자까지 작성가능합니다."),
});

const UploadPost = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG); // 이미지
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null); // 현재 유저 아이디

  // 이미지 업로드
  const upload = async () => {
    console.log("이미지 선택");
    let ImageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (ImageData.cancelled) {
      return null;
    }
    console.log(ImageData.uri);
    setThumbnailUrl(ImageData.uri);
  };

  // 유저 아이디
  const getUsername = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  // 유저 아이디 useEffect
  useEffect(() => {
    getUsername();
  }, []);

  // firebase에 적재시키기
  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        bookmarks_by_users: [],
        categories: [],
        tags: [],
        comments: [],
      })
      .then(() => navigation.navigate("CommunityStack"));

    return unsubscribe;
  };

  return (
    <Formik
      initialValues={{
        title: "",
        imageUrl: "",
        caption: "",
        categories: [],
        tags: [],
      }}
      onSubmit={(values) => {
        console.log(values);
        uploadPostToFirebase(
          values.imageUrl,
          values.title,
          values.caption,
          values.tags
        );
        console.log("잘 들어갔씀둥");
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity // 이미지
              onPress={upload}
              onChange={thumbnailUrl}
              value={values.imageUrl}
            >
              <Image
                source={{
                  uri: validUrl.isUri(thumbnailUrl)
                    ? thumbnailUrl
                    : PLACEHOLDER_IMG,
                }}
                style={styles.uploadphotowrapper}
              />
            </TouchableOpacity>
            <Pressable
             style={styles.textInputStyle}
             onPress={()=> navigation.navigate('SearchBar')}
             >
                <Text style={{color:'gray', marginLeft: 10}}>태그를 입력해주세요</Text>
            </Pressable>
            {errors.tags && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.tags}
              </Text>
            )}
            <View>
              <Text style={styles.onelinetitle}>본문 작성</Text>
              <TextInput
                autoComplete={false}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.onelinetext}
                placeholder="본문을 입력해주세요"
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
              />
            </View>
            {/* <TextInput
              autoComplete={false}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ color: "black", fontSize: 18 }}
              placeholder="본문을 입력해주세요"
              placeholderTextColor="black"
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            /> */}
            <Button onPress={handleSubmit} title="작성" disabled={!isValid} />
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default UploadPost;

const styles = StyleSheet.create({
  container: {
    // alignItems:'center',
    padding: 15,
    width: window.width * 0.98,

    // height:window.width * 0.9,
  },
  uploadphotowrapper: {
    // width: window.width,
    height: window.width * 0.87,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    borderRadius: 20,
    borderColor: "#C0E8E0",
    borderWidth: 5,
  },
  uploadphototext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  onelinetitle: {
    marginTop: 40,
    fontSize: 15,
    marginBottom: 5,
  },
  tags: {},
  categories: {},
  textInputStyle: {
    height: 40,
    marginTop:20, 
    borderWidth: 1,
    direction: 'row',
    justifyContent:'center',
    borderColor: "#009688",
    backgroundColor: "white",
  },
});
