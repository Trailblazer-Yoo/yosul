import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Avatar, Accessory, Divider } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../firebase";

// db.collectionGroup('그룹이름') => db 내의 새로운 컬렉션 생성
const db = firebase.firestore();
const window = Dimensions.get("screen");

const PLACEHOLDER_IMG =
  "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png";

function SetProfile2({ navigation }) {
  const SetProfileSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요"),
    age: Yup.number().required(),
    nickname: Yup.string().min(4, "닉네임은 4글자 이상이어야 합니다"),
    amount: Yup.number().required(),
    minContent: Yup.number().required(),
    maxContent: Yup.number().required(),
  });
  // 한글이 아닌 영어를 사용해야 접근 가능

  const [nicknames, setNicknames] = useState([]);

  const alcohols = [
    "탁주",
    "약주•청주",
    "과실주",
    "증류주",
    "리큐르",
    "기타주류",
  ];

  const [isColor, setColor] = useState("#ccc");
  const [isColor1, setColor1] = useState("#ccc");
  const [isColor2, setColor2] = useState("#ccc");
  const [isColor3, setColor3] = useState("#ccc");
  const [isColor4, setColor4] = useState("#ccc");
  const [isColor5, setColor5] = useState("#ccc");
  const [profile, setProfile] = useState(PLACEHOLDER_IMG);
  const [loading, setLoading] = useState(false);

  const checkNickname = async () => {
    try {
      const nickData = [];
      await db.collection("users").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => nickData.push(doc.data().nickname));
      });
      setNicknames(nickData);
      console.log(nicknames);
    } catch (error) {
      console.log(error.message);
    }
    return checkNickname;
  };
  useEffect(() => {
    checkNickname();
  }, []);

  const uploadProfileImage = async () => {
    setLoading(true);
    const getEmail = await AsyncStorage.getItem("userEmail");
    let ImageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (ImageData.cancelled) {
      setLoading(false);
      return null;
    }
    try {
      const image = ImageData.uri;
      const path = `photos/${getEmail}/${Date.now()}`;
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = `${path}${image.substring(image.lastIndexOf("/") + 1)}`;
      let ref = await firebase.storage().ref(filename);
      await ref.put(blob);
      const remoteurl = await ref.getDownloadURL();
      await setProfile(remoteurl);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const uploadUserProfile = async (
    name,
    age,
    nickname,
    amount,
    drink,
    minContent,
    maxContent
  ) => {
    try {
      setLoading(true);
      if (!nicknames.includes(nickname)) {
        const getEmail = await AsyncStorage.getItem("userEmail");
        const getPassword = await AsyncStorage.getItem("userPassword");
        const authUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(getEmail, getPassword);

        console.log("Firebase SignUp Successful", getEmail, getPassword);

        await db.collection("users").doc(authUser.user.email).set({
          owner_uid: authUser.user.uid,
          email: authUser.user.email,
          profile_picture: profile,
          username: name,
          age: age,
          nickname: nickname,
          amount: amount,
          drink: drink,
          minContent: minContent,
          maxContent: maxContent,
          myLikesDrinks: [],
          myBookmarksDrinks: [],
          myLikesPosts: [],
          myBookmarksPosts: [],
          follwing: [],
          follower: [],
        });
        console.log(uploadUserProfile);
        setLoading(false);
      } else {
        Alert.alert("이미 존재하는 닉네임입니다.");
        setLoading(false);
      }
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fafafa" }}>
      <Formik
        initialValues={{
          name: "",
          age: "",
          nickname: "",
          amount: "",
          drink: [],
          minContent: "",
          maxContent: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          uploadUserProfile(
            values.name,
            values.age,
            values.nickname,
            values.amount,
            values.drink,
            values.minContent,
            values.maxContent
          );
          console.log("들어갔다", values);
        }}
        validationSchema={SetProfileSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          isValid,
        }) => (
          <>
            <View>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  프로필 설정
                </Text>
              </View>
              <Divider />
            </View>
            <View>
              <View>
                <ScrollView style={{ height: window.height * 0.9 }}>
                  <TouchableOpacity
                    style={styles.profileContainer}
                    onPress={uploadProfileImage}
                  >
                    {profile === PLACEHOLDER_IMG ? (
                      <Avatar
                        size="xlarge"
                        rounded // 둥글게 설정하기
                        overlayContainerStyle={{ backgroundColor: "#C0E8E0" }}
                        icon={{ name: "user", type: "font-awesome" }}
                      >
                        <Accessory size={26} />
                      </Avatar>
                    ) : (
                      <View>
                        <Image
                          style={{
                            width: window.width * 0.4,
                            height: window.width * 0.4,
                            borderRadius: 100,
                            resizeMode: "cover",
                            borderColor: "black",
                          }}
                          source={{ uri: profile }}
                        />
                        <Accessory size={26} />
                      </View>
                    )}
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10,
                        // marginLeft: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        프로필 사진
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <View style={styles.texts}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        이름
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.inputField,
                        {
                          borderColor:
                            values.name.length > 1 || values.name.length === 0
                              ? "#ccc"
                              : "red",
                        },
                      ]}
                    >
                      <TextInput
                        placeholderTextColor="#444"
                        placeholder="이름을 입력해주세요."
                        autoCapitalize="none"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                      />
                    </View>
                    <View style={styles.texts}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        나이
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.inputField,
                        {
                          borderColor:
                            values.age > 19 || values.age.length === 0
                              ? "#ccc"
                              : "red",
                        },
                      ]}
                    >
                      <TextInput
                        placeholderTextColor="#444"
                        placeholder="나이를 입력해주세요."
                        autoCapitalize="none"
                        onChangeText={handleChange("age")}
                        onBlur={handleBlur("age")}
                        value={values.age}
                      />
                    </View>
                    <View style={[styles.texts, { flexDirection: "row" }]}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        닉네임
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          marginTop: 2.5,
                          marginLeft: 4,
                        }}
                      >
                        (4글자 이상)
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.inputField,
                        {
                          borderColor:
                            values.nickname.length >= 4 ||
                            values.nickname.length === 0
                              ? "#ccc"
                              : "red",
                        },
                      ]}
                    >
                      <TextInput
                        placeholderTextColor="#444"
                        placeholder="닉네임을 입력해주세요."
                        autoCapitalize="none"
                        clearButtonMode="always"
                        onChangeText={handleChange("nickname")}
                        onBlur={handleBlur("nickname")}
                        value={values.nickname}
                      />
                    </View>
                    <View style={styles.texts}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        주량
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.inputField,
                        {
                          borderColor:
                            values.amount.length >= 1 ||
                            values.amount.length === 0
                              ? "#ccc"
                              : "red",
                        },
                      ]}
                    >
                      <TextInput
                        placeholderTextColor="#444"
                        placeholder="숫자만 입력해주세요."
                        autoCapitalize="none"
                        onChangeText={handleChange("amount")}
                        onBlur={handleBlur("amount")}
                        value={values.amount}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginTop: 30,
                        marginBottom: 20,
                        marginLeft: 13,
                      }}
                    >
                      선호 주종
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 33,
                        marginBottom: 19,
                        marginLeft: 4,
                      }}
                    >
                      (하나만 선택하세요)
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        isColor === "#ccc"
                          ? setColor("#C0E8E0") &&
                            setColor1("#ccc") &&
                            setColor2("#ccc") &&
                            setColor3("#ccc") &&
                            setColor4("#ccc") &&
                            setColor5("#ccc")
                          : setColor("#ccc");
                        setFieldValue("drink", ["탁주"]);
                      }}
                      value={values.drink}
                      onChangeValue={handleChange("drink")}
                      style={[
                        styles.checkBoxDesign,
                        { backgroundColor: isColor },
                      ]}
                    >
                      <Text>{alcohols[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        isColor1 === "#ccc"
                          ? setColor1("#C0E8E0")
                          : setColor1("#ccc");
                        isColor1 === "#ccc"
                          ? setColor("#ccc") &&
                            setColor2("#ccc") &&
                            setColor3("#ccc") &&
                            setColor4("#ccc") &&
                            setColor5("#ccc")
                          : setColor1("#ccc");
                        setFieldValue("drink", ["약주•청주"]);
                      }}
                      value={values.drink}
                      onChangeValue={handleChange("drink")}
                      style={[
                        styles.checkBoxDesignRight,
                        { backgroundColor: isColor1 },
                      ]}
                    >
                      <Text>{alcohols[1]}</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        isColor2 === "#ccc"
                          ? setColor2("#C0E8E0") &&
                            setColor("#ccc") &&
                            setColor1("#ccc") &&
                            setColor3("#ccc") &&
                            setColor4("#ccc") &&
                            setColor5("#ccc")
                          : setColor2("#ccc");
                        setFieldValue("drink", ["과실주"]);
                      }}
                      value={values.drink}
                      style={[
                        styles.checkBoxDesign,
                        { backgroundColor: isColor2 },
                      ]}
                    >
                      <Text>{alcohols[2]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        isColor3 === "#ccc"
                          ? setColor3("#C0E8E0") &&
                            setColor("#ccc") &&
                            setColor1("#ccc") &&
                            setColor2("#ccc") &&
                            setColor4("#ccc") &&
                            setColor5("#ccc")
                          : setColor3("#ccc");
                        setFieldValue("drink", ["증류주"]);
                      }}
                      value={values.drink}
                      onChangeValue={handleChange("drink")}
                      style={[
                        styles.checkBoxDesignRight,
                        { backgroundColor: isColor3 },
                      ]}
                    >
                      <Text>{alcohols[3]}</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        isColor4 === "#ccc"
                          ? setColor4("#C0E8E0") &&
                            setColor("#ccc") &&
                            setColor1("#ccc") &&
                            setColor2("#ccc") &&
                            setColor3("#ccc") &&
                            setColor5("#ccc")
                          : setColor4("#ccc");
                        setFieldValue("drink", ["리큐르"]);
                      }}
                      value={values.drink}
                      onChangeValue={handleChange("drink")}
                      style={[
                        styles.checkBoxDesign,
                        { backgroundColor: isColor4 },
                      ]}
                    >
                      <Text>{alcohols[4]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        isColor5 === "#ccc"
                          ? setColor5("#C0E8E0") &&
                            setColor("#ccc") &&
                            setColor1("#ccc") &&
                            setColor2("#ccc") &&
                            setColor3("#ccc") &&
                            setColor4("#ccc")
                          : setColor5("#ccc");
                        setFieldValue("drink", ["기타주류"]);
                      }}
                      value={values.drink}
                      onChangeValue={handleChange("drink")}
                      style={[
                        styles.checkBoxDesignRight,
                        { backgroundColor: isColor5 },
                      ]}
                    >
                      <Text>{alcohols[5]}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        marginTop: 30,
                        marginBottom: 20,
                        marginLeft: 13,
                      }}
                    >
                      선호 도수
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        marginTop: 34,
                        marginLeft: 4,
                      }}
                    >
                      (숫자만 입력하세요)
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <TextInput
                      style={styles.inputContent}
                      placeholderTextColor="#444"
                      placeholder="최소"
                      textAlign="center"
                      autoCapitalize="none"
                      onChangeText={handleChange("minContent")}
                      onBlur={handleBlur("minContent")}
                      value={values.minContent}
                    />
                    <TextInput
                      style={styles.inputContent}
                      placeholderTextColor="#444"
                      placeholder="최대"
                      textAlign="center"
                      autoCapitalize="none"
                      onChangeText={handleChange("maxContent")}
                      onBlur={handleBlur("maxContent")}
                      value={values.maxContent}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text style={{ marginRight: 40 }}>최소 도수</Text>
                    <Text>최대 도수</Text>
                  </View>
                  <View style={styles.buttonContainer(isValid)}>
                    <TouchableOpacity
                      style={styles.buttonDesign}
                      onPress={handleSubmit}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "500",
                          color: "white",
                          margin: 25,
                        }}
                      >
                        설정 완료
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </Formik>
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
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  texts: {
    marginLeft: 11,
    marginTop: 20,
  },
  inputField: {
    borderRadius: 4,
    padding: 13,
    backgroundColor: "#fafafa",
    margin: 12,
    borderWidth: 1,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: window.width * 0.6,
    flex: 1,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.3,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDesign: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 25,
  },
  buttonContainer: (isValid) => ({
    // position: "absolute",
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    backgroundColor: isValid ? "#C0E8E0" : "#444",
    height: window.height * 0.09,
  }),
  texts: {
    marginLeft: 11,
    marginTop: 24,
  },
  checkBoxDesign: {
    width: window.width * 0.43,
    height: 80,
    borderStyle: "solid",
    borderRadius: 20,
    margin: 7,
    marginLeft: 19,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fafafa",
  },
  checkBoxDesignRight: {
    width: window.width * 0.43,
    height: 80,
    borderStyle: "solid",
    borderRadius: 20,
    margin: 7,
    marginRight: 19,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fafafa",
  },
  inputContent: {
    borderRadius: 4,
    padding: 13,
    backgroundColor: "#fafafa",
    margin: 12,
    borderWidth: 1,
    width: 100,
    alignItems: "center",
  },
});

export default SetProfile2;
