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
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import validUrl from "valid-url";
import firebase from "../../firebase";
import { CommonActions } from "@react-navigation/native";

const db = firebase.firestore();
const window = Dimensions.get("window");

const PLACEHOLDER_IMG =
  "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";

// 허용된 것과 허용되지 않은 것들
const uploadPostSchema = Yup.object().shape({
  tags: Yup.array().max(3, "태그는 3개까지 가능합니다."),
  caption: Yup.string().max(2200, "본문은 2200자까지 작성가능합니다."),
});

const UploadPost = ({ navigation, route }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG); // 이미지
  const [imageArray, setImageArray] = useState([{ image: PLACEHOLDER_IMG }]); // 이미지
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null); // 현재 유저 아이디
  const [TagList, setTagList] = useState([]); // 태그 리스트 받아오기

  // 이미지 업로드
  const uploadThumbnailImage = async () => {
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
    setThumbnailUrl(ImageData.uri);
  };

  // 이미지 하나하나 넣기
  const fixImageArray = async (index) => {
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
    if (index === (imageArray.length - 1).toString()) {
      setImageArray([{ image: ImageData.uri }, ...imageArray]);
    } else {
      const newArray = imageArray.splice(index, index, {
        image: ImageData.uri,
      });
      setImageArray(newArray[0]);
    }
    console.log(imageArray);
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
  const uploadTagsToFirebase = async (taglist) => {
    const dataSnapShot = (
      await db.collection("global").doc("tags").get()
    ).data();

    const items = Object.keys(dataSnapShot);

    for (let i = 0; i < taglist.length; i++) {
      let tag = taglist[i].tag;
      const update = {};
      if (items.includes(tag)) {
        update[`${tag}.count`] = dataSnapShot[tag].count + 1;
        db.collection("global").doc("tags").update(update);
      } else {
        update[`${tag}`] = { count: 1 };
        db.collection("global").doc("tags").update(update);
      }
    }
  };

  const uploadPostToFirebase = (imageUrl, imagearray, caption, tags) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageArray: [{ imageurl: imageUrl }, ...imagearray],
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        bookmarks_by_users: [],
        tags: tags,
        comments: [],
      })
      .then(() =>
        navigation.dispatch(CommonActions.navigate("CommunityStack"))
      );

    return unsubscribe;
  };

  // 태그 출력 형태
  const TagView = ({ item }) => {
    return <Text style={styles.tagview}>#{item.tag} </Text>;
  };

  const ImageView = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => fixImageArray(index.toString())}
        onChange={imageArray}
      >
        <Image source={{ uri: item.image }} style={styles.imagearraywrapper} />
      </TouchableOpacity>
    );
  };

  // 태그
  useEffect(() => {
    if (route.params !== undefined) {
      // 태그를 설정했다면
      const arr = [];
      for (let i = 0; i < route.params.tags.length; i++) {
        arr.push({ tag: route.params.tags[i] });
      }
      setTagList(arr);
    } else {
      // 태그를 설정하지 않았다면
      return;
    }
  }, [route.params]);
  console.log(TagList);

  return (
    <Formik
      initialValues={{
        imageUrl: "",
        imageArray: [],
        caption: "",
        tags: [],
      }}
      onSubmit={(values) => {
        console.log(values);
        uploadTagsToFirebase(TagList);
        uploadPostToFirebase(thumbnailUrl, imageArray.slice(undefined,imageArray.length-1), values.caption, TagList);
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
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity // 이미지
              onPress={uploadThumbnailImage}
              onChange={thumbnailUrl}
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
            <FlatList
              style={{ padding: 5 }}
              data={imageArray}
              extraData={imageArray}
              renderItem={ImageView}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            {!!!route.params ? (
              <></>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginTop: 10,
                }}
              >
                <FlatList
                  style={{ padding: 5 }}
                  data={TagList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={TagView}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
            <Pressable
              style={styles.textInputStyle}
              onPress={() => navigation.navigate("SearchBar")}
            >
              {!!!route.params ? (
                <Text style={{ color: "gray", marginLeft: 10 }}>
                  태그를 입력해주세요
                </Text>
              ) : (
                <Text style={{ color: "gray", marginLeft: 10 }}>
                  태그를 수정해주세요
                </Text>
              )}
            </Pressable>
            {errors.tags && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.tags}</Text>
            )}
            <View>
              <Text style={styles.onelinetitle}>본문 작성</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.onelinetext}
                placeholder="본문을 입력해주세요"
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
            <Button onPress={handleSubmit} title="작성" disabled={!isValid} />
          </View>
        </ScrollView>
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
    backgroundColor: "white",

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
  imagearraywrapper: {
    width: window.width / 5 - 3,
    height: window.width / 5 - 3,
    borderRadius: 15,
    resizeMode: "cover",
    marginHorizontal: 1,
    marginVertical: 1,
  },
  uploadphototext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  onelinetitle: {
    marginTop: 20,
    fontSize: 15,
    marginBottom: 5,
  },
  tags: {},
  categories: {},
  textInputStyle: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    direction: "row",
    justifyContent: "center",
    borderColor: "#009688",
    backgroundColor: "white",
  },
});
