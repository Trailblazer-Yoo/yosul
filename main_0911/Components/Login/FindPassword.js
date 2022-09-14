import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import firebase from "../../firebase";

const FindPassword = ({ navigation }) => {
  const FindPasswordFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
  });

  const findPassword = (email) => {
    const user = email;
    if (user != null) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert("회원님의 이메일로 재설정 링크를 전송하였습니다.");
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  };
  return (
    <View>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          findPassword(values.email);
        }}
        validationSchema={FindPasswordFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <Text>이메일을 입력하세요</Text>
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
                autoCorrect={false}
                textContentType="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>로그인</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
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
  inputField: {
    borderRadius: 4,
    padding: 13,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
  },
});

export default FindPassword;
