import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import firebase from "../firebase";
import { async } from "@firebase/util";

function LoginForm({ navigation }) {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password has to have at least 8 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase Login Successful", email, password);
    } catch (error) {
      Alert.alert(
        "Alert",
        error.message[
          ({
            text: "OK",
            onPress: () => console.log("OK"),
            style: "cancel",
          },
          { text: "Sign UP", onPress: () => navigation.push("SignupScreen") })
        ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
          onPress = () => navigation.push("SetProfileScreen");
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={false}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#191919" }}>
                비밀번호를 잃어버리셨나요?
              </Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>로그인</Text>
            </Pressable>
            <Pressable
              titleSize={20}
              style={styles.kakaoButton}
              onPress={() => navigation.push("KaKaoLogin")}
            >
              <View style={styles.kakaoContainer}>
                <Image
                  source={require("../assets/kakaoLogin.png")}
                  style={styles.kakaoImage}
                />
                <Text>카카오로 시작하기</Text>
              </View>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>계정이 없으신가요? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6bb0f5" }}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 13,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#C0E8E0" : "#444",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 6,
    marginTop: 10,
  },
  kakaoText: {
    color: "#191919",
    fontSize: 30,
  },
  kakaoImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 8,
  },
  kakaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginForm;
