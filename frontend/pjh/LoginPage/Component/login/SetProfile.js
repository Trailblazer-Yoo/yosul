import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import React from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  Avatar,
  Accessory,
  Divider,
  CheckBox,
  FormLabel,
  FormInput,
} from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";


// db.collectionGroup('그룹이름') => db 내의 새로운 컬렉션 생성

const db = firebase.firestore()

const SetProfile = ({ navigation }) => {
  const SetProfileSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요"),
    age: Yup.string().required(),
    nickname: Yup.string().min(4, "닉네임은 4글자 이상이어야 합니다"),
  });
  return (
    <SafeAreaView style={{ backgroundColor: "#fafafa" }}>
      <Formik
        initialValues={{ name: "", age: "", nickname: "" }}
        validationSchema={SetProfileSchema}
        validateOnMount={true}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isValid }) => (
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
                  onChange={handleChange("name")}
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
                  onChange={handleChange("age")}
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
                  onChange={handleChange("nickname")}
                  onBlur={handleBlur("nickname")}
                  value={values.nickname}
                />
              </View>
              <View
                style={styles.buttonContainer(isValid)}
                
              >
                <TouchableOpacity
                  style={styles.buttonDesign}
                  disable={!isValid}
                  onPress={() => navigation.push("PreferredDrinkScreen")}
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
};

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
  buttonContainer: (isValid) => ({
    marginTop: 50,
    height: "100%",
    // justifyContent: "center",
    backgroundColor: isValid ? "#C0E8E0" : "#444",
  }),
});

export default SetProfile;
