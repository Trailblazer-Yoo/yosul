import React, { useState, useEffect } from "react";
import {
  TextInput,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { Accessory } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";
import * as ImagePicker from "expo-image-picker";

const db = firebase.firestore();
const window = Dimensions.get("screen");

const EditProfile = ({ route }) => {
  const EditProfileSchema = Yup.object().shape({
    nickname: Yup.string().min(4, "닉네임은 4글자 이상이어야 합니다"),
    amount: Yup.number().required(),
    minContent: Yup.number().required(),
    maxContent: Yup.number().required(),
  });

  const alcohols = [
    "탁주",
    "약주•청주",
    "과실주",
    "증류주",
    "리큐르",
    "기타주류",
  ];

  const userInfo = route.params.userInfo;
  const [isSelect, setSelect] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(userInfo.profile_picture);
  const [nicknames, setNicknames] = useState([]);

  useEffect(() => {
    const userdrink = userInfo.drink;
    const data = [];
    for (let i = 0; i < userdrink.length; i++) {
      if (alcohols.includes(userdrink[i])) {
        data.push(true);
      } else {
        data.push(false);
      }
    }
    setSelect(data);
  }, []);

  const colorchange = (idx, drink) => {
    const drinkname = alcohols[idx];
    if (drink.includes(drinkname)) {
      drink.splice(drink.indexOf(drinkname), 1);
      setSelect([
        ...isSelect.slice(0, idx),
        !isSelect[idx],
        ...isSelect.slice(idx + 1),
      ]);
    } else {
      drink.push(drinkname);
      setSelect([
        ...isSelect.slice(0, idx),
        !isSelect[idx],
        ...isSelect.slice(idx + 1),
      ]);
    }
  };

  const pickImage = async () => {
    setLoading(true);
    let ImageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (ImageData.cancelled) {
      setLoading(false)
      return null;
    }
    const image = ImageData.uri;
    const getEmail = userInfo.email;
    const path = `photos/${getEmail}/${Date.now()}`;
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = `${path}${image.substring(image.lastIndexOf("/") + 1)}`;
    let ref = firebase.storage().ref(filename);
    await ref.put(blob);
    const remoteurl = await ref.getDownloadURL();
    await setProfile(remoteurl);
    setLoading(false);
  };

  const checkNickname = async () => {
    try {
      const nickData = [];
      await db.collection("users").onSnapshot((snapshot) => {
        setNicknames(snapshot.docs.map((doc) => doc.data().nickname));
      });
    } catch (error) {
      console.log(error.message);
    }
    return checkNickname;
  };

  useEffect(() => {
    checkNickname();
  }, []);

  const editUserProfile = async (
    nickname,
    amount,
    drink,
    minContent,
    maxContent,
    image
  ) => {
    setLoading(true);
    await db.collection("users").doc(firebase.auth().currentUser.email).update({
      profile_picture: image,
      nickname: nickname,
      amount: amount,
      drink: drink,
      minContent: minContent,
      maxContent: maxContent,
    });
    console.log(editUserProfile);
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fafafa" }}>
      <Formik
        initialValues={{
          profile_picture: userInfo.profile_picture,
          nickname: userInfo.nickname,
          amount: userInfo.amount,
          drink: userInfo.drink,
          minContent: userInfo.minContent,
          maxContent: userInfo.maxContent,
        }}
        onSubmit={async (values) => {
          if (userInfo.nickname === values.nickname) {
            editUserProfile(
              values.nickname,
              values.amount,
              values.drink,
              values.minContent,
              values.maxContent,
              profile
            );
          } else {
            if (!nicknames.includes(values.nickname)) {
              editUserProfile(
                values.nickname,
                values.amount,
                values.drink,
                values.minContent,
                values.maxContent,
                profile
              );
            } else {
              Alert.alert("이미 존재하는 닉네임입니다.");
            }
          }
        }}
        validationSchema={EditProfileSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <ScrollView>
              <TouchableOpacity
                style={styles.profileContainer}
                onPress={pickImage}
              >
                <View>
                  <Image
                    style={{
                      width: window.width * 0.5,
                      height: window.width * 0.5,
                      borderRadius: 100,
                      resizeMode: "cover",
                      borderColor: "black",
                    }}
                    source={{ uri: profile }}
                  />
                  <Accessory size={26} />
                </View>
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
                    프로필 변경
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
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
                    {values.nickname.length === 0
                      ? "(4글자 이상)"
                      : values.nickname.length >= 4
                      ? ""
                      : "4글자 이상 입력해야 합니다."}
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
                    주량(소주기준)
                  </Text>
                </View>
                <View
                  style={[
                    styles.inputField,
                    {
                      borderColor:
                        !!Number(values.amount) || values.amount === ""
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
                  (중복 선택 가능)
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
                    colorchange(0, values.drink);
                  }}
                  value={values.drink}
                  onChangeValue={handleChange("drink")}
                  style={[
                    styles.checkBoxDesign,
                    { backgroundColor: isSelect[0] ? "#C0E8E0" : "#ccc" },
                  ]}
                >
                  <Text>{alcohols[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    colorchange(1, values.drink);
                  }}
                  value={values.drink}
                  onChangeValue={handleChange("drink")}
                  style={[
                    styles.checkBoxDesignRight,
                    { backgroundColor: isSelect[1] ? "#C0E8E0" : "#ccc" },
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
                    colorchange(2, values.drink);
                  }}
                  value={values.drink}
                  style={[
                    styles.checkBoxDesign,
                    { backgroundColor: isSelect[2] ? "#C0E8E0" : "#ccc" },
                  ]}
                >
                  <Text>{alcohols[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    colorchange(3, values.drink);
                  }}
                  value={values.drink}
                  onChangeValue={handleChange("drink")}
                  style={[
                    styles.checkBoxDesignRight,
                    { backgroundColor: isSelect[3] ? "#C0E8E0" : "#ccc" },
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
                    colorchange(4, values.drink);
                  }}
                  value={values.drink}
                  onChangeValue={handleChange("drink")}
                  style={[
                    styles.checkBoxDesign,
                    { backgroundColor: isSelect[4] ? "#C0E8E0" : "#ccc" },
                  ]}
                >
                  <Text>{alcohols[4]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    colorchange(5, values.drink);
                  }}
                  value={values.drink}
                  onChangeValue={handleChange("drink")}
                  style={[
                    styles.checkBoxDesignRight,
                    { backgroundColor: isSelect[5] ? "#C0E8E0" : "#ccc" },
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
};

export default EditProfile;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  body: {
    marginTop: 10,
    backgroundColor: "white",
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  buttonContainer2: {
    marginTop: 20,
    height: 50,
    flexDirection: "row",
    justifyContent: "right",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderColor: "#C0E8E0",
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: "white",
  },
  textInput: {
    color: "grey",
    fontSize: 17,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 250,
    borderRadius: 10,
    justifyContent: "center",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#C0E8E0",
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  question: {
    paddingHorizontal: 10,
    width: 300,
    fontSize: 20,
    lineHeight: 19,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  header2: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
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
