import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Avatar, Accessory, Divider } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";

// db.collectionGroup('그룹이름') => db 내의 새로운 컬렉션 생성
const db = firebase.firestore();
const window = Dimensions.get("screen");

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

  const alcohols = [
    "탁주",
    "약주•청주",
    "과실주",
    "증류주",
    "리큐르",
    "기타주류",
  ];

  const [isColor, setColor] = useState("grey");
  const [isColor1, setColor1] = useState("grey");
  const [isColor2, setColor2] = useState("grey");
  const [isColor3, setColor3] = useState("grey");
  const [isColor4, setColor4] = useState("grey");
  const [isColor5, setColor5] = useState("grey");

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
      const getEmail = await AsyncStorage.getItem("userEmail");
      const getPassword = await AsyncStorage.getItem("userPassword");
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(getEmail, getEmail);

      console.log("Firebase SignUp Successful", getEmail, getPassword);

      db.collection("users").doc(authUser.user.email).set({
        owner_uid: authUser.user.uid,
        email: authUser.user.email,
        username: name,
        age: age,
        nickname: nickname,
        amount: amount,
        drink: drink,
        minContent: minContent,
        maxContent: maxContent,
      });
      console.log(uploadUserProfile);
    } catch (error) {
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
                  <View style={styles.profileContainer}>
                    <Avatar
                      size="xlarge"
                      rounded // 둥글게 설정하기
                      overlayContainerStyle={{ backgroundColor: "#C0E8E0" }}
                      icon={{ name: "user", type: "font-awesome" }}
                    >
                      <Accessory size={26} />
                    </Avatar>
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
                  </View>
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
                    <View style={styles.inputField}>
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
                    <View style={styles.inputField}>
                      <TextInput
                        placeholderTextColor="#444"
                        placeholder="나이를 입력해주세요."
                        autoCapitalize="none"
                        onChangeText={handleChange("age")}
                        onBlur={handleBlur("age")}
                        value={values.age}
                      />
                    </View>
                    <View style={styles.texts}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        닉네임
                      </Text>
                    </View>
                    <View style={styles.inputField}>
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
                    <View style={styles.inputField}>
                      <TextInput
                        placeholderTextColor="#444"
                        placeholder="주량을 입력해주세요."
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
                        isColor === "grey"
                          ? setColor("#C0E8E0") &&
                            setColor1("grey") &&
                            setColor2("grey") &&
                            setColor3("grey") &&
                            setColor4("grey") &&
                            setColor5("grey")
                          : setColor("grey");
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
                        isColor1 === "grey"
                          ? setColor1("#C0E8E0")
                          : setColor1("grey");
                        isColor1 === "grey"
                          ? setColor("grey") &&
                            setColor2("grey") &&
                            setColor3("grey") &&
                            setColor4("grey") &&
                            setColor5("grey")
                          : setColor1("grey");
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
                        isColor2 === "grey"
                          ? setColor2("#C0E8E0") &&
                            setColor("grey") &&
                            setColor1("grey") &&
                            setColor3("grey") &&
                            setColor4("grey") &&
                            setColor5("grey")
                          : setColor2("grey");
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
                        isColor3 === "grey"
                          ? setColor3("#C0E8E0") &&
                            setColor("grey") &&
                            setColor1("grey") &&
                            setColor2("grey") &&
                            setColor4("grey") &&
                            setColor5("grey")
                          : setColor3("grey");
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
                        isColor4 === "grey"
                          ? setColor4("#C0E8E0") &&
                            setColor("grey") &&
                            setColor1("grey") &&
                            setColor2("grey") &&
                            setColor3("grey") &&
                            setColor5("grey")
                          : setColor4("grey");
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
                        isColor5 === "grey"
                          ? setColor5("#C0E8E0") &&
                            setColor("grey") &&
                            setColor1("grey") &&
                            setColor2("grey") &&
                            setColor3("grey") &&
                            setColor4("grey")
                          : setColor5("grey");
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
                  <View style={styles.buttonContainer}>
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
  buttonDesign: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 25,
  },
  buttonContainer: {
    // position: "absolute",
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#C0E8E0",
    height: window.height * 0.09,
  },
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
