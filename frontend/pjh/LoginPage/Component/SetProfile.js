import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  Avatar,
  Accessory,
  Divider,
} from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../firebase";

// db.collectionGroup('그룹이름') => db 내의 새로운 컬렉션 생성
const db = firebase.firestore();

function SetProfile({ navigation }) {
  const SetProfileSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요"),
    age: Yup.number().required(),
    nickname: Yup.string().min(4, "닉네임은 4글자 이상이어야 합니다"),
  });
  // 한글이 아닌 영어를 사용해야 접근 가능
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUserEmail = () => {
    const user = firebase.auth().currentUser;
    console.log();
    const unsubscribe = db
      .collection("users")
      .where("onwer_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            email: doc.data().email,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserEmail();
    console.log(currentLoggedInUser);
  }, []);

  const uploadUserProfile = (name, age, nickname) => {
    try {
      const unsubscribe = db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .set({
          owner_uid: firebase.auth().currentUser.uid,
          email: firebase.auth().currentUser.email,
          name: name,
          age: age,
          nickname: nickname,
        })
        .then(() => navigation.push("PreferredDrinkScreen"));
      console.log(uploadUserProfile);
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fafafa" }}>
      <Formik
        initialValues={{ name: "", age: "", nickname: "" }}
        onSubmit={(values) => {
          console.log(values);
          uploadUserProfile(values.name, values.age, values.nickname);
          console.log("들어갔다", values);
        }}
        validationSchema={SetProfileSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                프로필 설정
              </Text>
            </View>
            <Divider />
            <View>
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonDesign}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{ fontSize: 30, fontWeight: "500", color: "white" }}
                  >
                    다음
                  </Text>
                </TouchableOpacity>
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
    flex: 1,
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
    marginTop: 50,
    marginBottom: 30,
  },
  buttonDesign: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#C0E8E0",
  },
});

export default SetProfile;
