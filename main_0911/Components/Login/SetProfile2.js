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
import { Avatar, Accessory, Divider, CheckBox } from "react-native-elements";
import { Formik } from "formik";
import { ProgressBar } from "react-native-paper";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../firebase";

// db.collectionGroup('그룹이름') => db 내의 새로운 컬렉션 생성
const db = firebase.firestore();
const window = Dimensions.get("screen");

const PLACEHOLDER_IMG =
  "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg";

function SetProfile2({ navigation }) {
  const SetProfileSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요"),
    age: Yup.number().min(20),
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

  const [profile, setProfile] = useState(PLACEHOLDER_IMG);
  const [isSelect, setSelect] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [loading, setLoading] = useState(false);

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

  const checkNickname = async () => {
    try {
      const nickData = [];
      await db.collection("users").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => nickData.push(doc.data().nickname));
      });
      setNicknames(nickData);
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

  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);

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
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View>
              <View>
                <ProgressBar
                  progress={1}
                  color="#C0E8E0"
                  // style={{ marginTop: 50 }}
                />
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
                        autoCorrect={false}
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
                        placeholder="나이를 입력해주세요(20세 이상만 가능합니다)."
                        autoCapitalize="none"
                        autoCorrect={false}
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
                        autoCorrect={false}
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
                        autoCorrect={false}
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
                      autoCorrect={false}
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
                      autoCorrect={false}
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
                  <View style={{ marginTop: window.width * 0.1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginHorizontal: -20,
                        marginRight: 10,
                      }}
                    >
                      <CheckBox
                        title={"서비스 이용약관 (필수)"}
                        checked={checked2}
                        checkedIcon="check"
                        checkedColor="#C0E8E0"
                        uncheckedIcon="check"
                        uncheckedColor="#ccc"
                        onPress={() => setChecked2(!checked2)}
                        activeOpacity={0.8}
                        containerStyle={{ borderColor: "#fafafa" }}
                      />
                      <TouchableOpacity
                        style={{
                          marginTop: window.width * 0.05,
                          marginLeft: 15,
                        }}
                      >
                        <Text>보기</Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginHorizontal: -15,
                        marginRight: 10,
                      }}
                    >
                      <CheckBox
                        title={"개인정보 처리방침 (필수)"}
                        checked={checked}
                        checkedIcon="check"
                        checkedColor="#C0E8E0"
                        uncheckedIcon="check"
                        uncheckedColor="#ccc"
                        onPress={() => setChecked(!checked)}
                        activeOpacity={0.8}
                        containerStyle={{ borderColor: "#fafafa" }}
                      />
                      <TouchableOpacity
                        style={{ marginTop: window.width * 0.05 }}
                        onPress={() => navigation.push("PrivacyPolicyScreen")}
                      >
                        <Text>보기</Text>
                      </TouchableOpacity>
                    </View>
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
                  <View
                    style={{
                      height: window.width * 0.7,
                      backgroundColor: "white",
                    }}
                  ></View>
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
