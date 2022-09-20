import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import validUrl from "valid-url";
import firebase from "../../firebase";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const db = firebase.firestore();
const window = Dimensions.get("window");

const PLACEHOLDER_IMG =
  "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg";

// 허용된 것과 허용되지 않은 것들
const uploadPostSchema = Yup.object().shape({
  tags: Yup.array().max(3, "태그는 3개까지 가능합니다."),
  caption: Yup.string().max(2200, "본문은 2200자까지 작성가능합니다."),
});

const UploadPost = ({ navigation, route }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG); // 이미지
  const [imageArray, setImageArray] = useState([]); // 이미지
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null); // 현재 유저 아이디
  const [tagList, setTagList] = useState([]); // 태그 리스트 받아오기
  const [items, setItems] = useState([]); // 태그 목록들 firebase에서 가져오기
  const [dataSnapShot, setDataSnapShot] = useState([]); // 태그 하위 목록 firebase에서 가져오기
  const [loading, setLoading] = useState(false);

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
            nickname: doc.data().nickname,
            profile_picture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  // 태그 전체 목록
  const TagSnapshot = async () => {
    const snapshot = (await db.collection("global").doc("tags").get()).data();
    const newitems = await Object.keys(snapshot);
    await setDataSnapShot(snapshot);
    await setItems(newitems);
  };

  // 유저 아이디 useEffect
  useEffect(() => {
    getUsername();
    TagSnapshot();
  }, []);

  // 이미지 업로드
  const uploadThumbnailImage = async () => {
    let ImageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });
    if (ImageData.cancelled) {
      return null;
    }
    setThumbnailUrl(ImageData.uri);
    if (!!!imageArray.length) {
      await setImageArray([PLACEHOLDER_IMG]);
    }
  };

  // 이미지 하나하나 넣기
  const editImageArray = async (index) => {
    let ImageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });
    if (ImageData.cancelled) {
      return null;
    }
    if (index === (imageArray.length - 1).toString()) {
      setImageArray([
        ...imageArray.slice(0, -1),
        ImageData.uri,
        imageArray.slice(-1)[0],
      ]);
    } else {
      await imageArray.splice(index, 1, ImageData.uri);
      await setImageArray([...imageArray]);
    }
    console.log(imageArray);
  };

  // 태그
  useEffect(() => {
    if (route.params !== undefined) {
      // 태그를 설정했다면
      const arr = [];
      for (let i = 0; i < route.params.tags.length; i++) {
        arr.push(route.params.tags[i]);
      }
      setTagList(arr);
    } else {
      // 태그를 설정하지 않았다면
      return;
    }
  }, [route.params]);

  // firebase에 적재시키기
  const uploadPost2Firebase = async (imagearray, caption, taglist) => {
    try {
      setLoading(true);
      for (var tag of taglist) {
        const update = {};
        if (items.includes(tag)) {
          update[`${tag}.count`] = dataSnapShot[tag].count + 1;
          await db.collection("global").doc("tags").update(update);
        } else {
          update[`${tag}`] = { count: 1 };
          await db.collection("global").doc("tags").update(update);
        }
      }

      const remoteImageArray = [];
      const path = await `photos/${
        firebase.auth().currentUser.email
      }/${Date.now()}`;
      for (var image of imagearray) {
        const response = await fetch(image);
        const blob = await response.blob();
        const filename = await `${path}${image.substring(
          image.lastIndexOf("/") + 1
        )}`;
        let ref = await firebase.storage().ref(filename);
        await ref.put(blob);
        const remoteurl = await ref.getDownloadURL();
        await remoteImageArray.push(remoteurl);
      }
      setLoading(false);
      const unsubscribe = await db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .collection("posts")
        .add({
          imageArray: remoteImageArray,
          nickname: currentLoggedInUser.nickname,
          profile_picture: currentLoggedInUser.profile_picture,
          owner_uid: firebase.auth().currentUser.uid,
          owner_email: firebase.auth().currentUser.email,
          caption: caption,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          likes_by_users: [],
          bookmarks_by_users: [],
          tags: taglist,
          comments: [],
        })
        .then(async () => {
          await setThumbnailUrl(PLACEHOLDER_IMG);
          await setImageArray([]);
          await setTagList([]);
          await setLoading(false);
        })
        .then(() => navigation.navigate("CommunityStack"));
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  };

  // 출력 형태
  const TagView = ({ item }) => {
    return <Text style={styles.tagview}>#{item} </Text>;
  };

  const ImageView = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={
          imageArray[index] === PLACEHOLDER_IMG
            ? () => {
                editImageArray(index.toString());
              }
            : () =>
                Alert.alert("수정", "이 사진을 삭제 혹은 수정하시겠습니까?", [
                  // 버튼 배열
                  {
                    text: "삭제",
                    onPress: () => {
                      setImageArray(
                        imageArray.filter((array) => array !== item)
                      );
                    },
                  },
                  {
                    text: "수정",
                    onPress: () => {
                      editImageArray(index.toString());
                    },
                  },
                ])
        }
        onChange={imageArray}
      >
        <Image source={{ uri: item }} style={styles.imagearraywrapper} />
      </TouchableOpacity>
    );
  };

  return (
    <Formik
      initialValues={{
        caption: "",
      }}
      onSubmit={async (values) => {
        const tmpArray = await [thumbnailUrl, ...imageArray.slice(0, -1)];
        uploadPost2Firebase(tmpArray, values.caption, tagList);
        console.log("성공적으로 업로드 되었습니다!");
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <KeyboardAwareScrollView>
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
                keyExtractor={(item, index) => index.toString()}
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
                    data={tagList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={TagView}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              )}
              <Text
                style={{
                  marginTop: 15,
                  fontSize: RFPercentage(1.73),
                }}
              >
                {" "}
                태그 작성{" "}
              </Text>
              <Pressable
                style={styles.textInputStyle}
                onPress={() => navigation.navigate("SearchBar")}
              >
                {!!!route.params ? (
                  <Text style={{ color: "gray", marginLeft: 10 }}>
                    태그를 입력해주세요 ex) #우리술#여술램프#최고
                  </Text>
                ) : (
                  <Text style={{ color: "gray", marginLeft: 10 }}>
                    태그를 수정해주세요
                  </Text>
                )}
              </Pressable>
              {errors.tags && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.tags}
                </Text>
              )}
              <Text style={{ marginTop: 15, fontSize: RFPercentage(1.73) }}>
                {" "}
                본문 작성{" "}
              </Text>
              <View
                style={{
                  borderWidth: 3,
                  borderRadius: 5,
                  borderColor: "#C0E8E0",
                  marginTop: 10,
                  width: window.width * 0.93,
                  height: window.width * 0.39,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.onelinetext}
                  placeholder="본문을 입력해주세요"
                  placeholderTextColor="gray"
                  multiline={true}
                  maxLength={500}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
              </View>
              <View style={styles.buttonContainer(isValid)}>
                <TouchableOpacity
                  style={styles.buttonDesign}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      fontSize: RFPercentage(3.46),
                      fontWeight: "500",
                      color: "white",
                      margin: 23,
                      marginTop: window.width * 0.055,
                    }}
                  >
                    작성 완료
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {loading === true ? (
            <View style={styles.loading}>
              <ActivityIndicator
                color="#C0E8E0"
                size="large"
                style={{ opacity: 1.5 }}
              />
            </View>
          ) : (
            <></>
          )}
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default UploadPost;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: window.width * 0.98,
    backgroundColor: "white",
    borderRadius: 10,
  },
  uploadphotowrapper: {
    height: window.width * 0.87 * 1.41,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    borderRadius: 10,
    borderColor: "#C0E8E0",
    borderWidth: 3,
  },
  imagearraywrapper: {
    width: window.width / 5,
    height: (window.width / 5) * 1.41,
    borderRadius: 5,
    resizeMode: "cover",
    marginHorizontal: 1,
    marginVertical: 1,
  },
  buttonContainer: (isValid) => ({
    // position: "absolute",
    marginTop: 40,
    width: "100%",
    alignItems: "center",
    backgroundColor: isValid ? "#C0E8E0" : "#444",
    height: window.height * 0.09,
  }),
  uploadphototext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonDesign: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 25,
  },
  onelinetitle: {
    marginTop: 20,
    fontSize: 15,
    marginBottom: 5,
    color: "grey",
  },
  onelinetext: {
    marginLeft: 5,
  },
  tags: {},
  loading: {
    position: "absolute",
    height: window.height,
    left: 0,
    right: 0,
    top: 5,
    bottom: 0,
    opacity: 0.3,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    direction: "row",
    justifyContent: "center",
    borderColor: "#009688",
    backgroundColor: "white",
    borderRadius: 5,
  },
});
