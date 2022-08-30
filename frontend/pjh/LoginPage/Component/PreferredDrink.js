import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Divider, Slider } from "react-native-elements";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import firebase from "../firebase";

const db = firebase.firestore().collection("users");
const window = Dimensions.get("window");

// 문제 1 : firebase -> undefined 값이 들어간다고 나옴 (uploadUserDrink 부분 확인 중)
// 문제 2 : 선호주종 선택 -> array에 값이 안들어감.(해결)
// 문제 2-1 : 각 버튼별로 setSelect가 달라져서 이를 하나로 합치는 코드가 필요
// -> 새로운 함수 만들어서 하나의 코드로 돌아가게 설정하기 그 후 onPress = {함수이름}
// 함수 안에 들어갈 것들 : 선호주종 리스트 변환 & 눌렀을 때 색상 변하는 효과
// 문제 2-2 : drink의 isSelect 값이 안변함
// 문제 3 : slider 변수 : console.log 찍어보니 값이 변해도 undefined로 나옴

const PreferredDrink = ({ navigation }) => {
  const SetDrinkSchema = Yup.object().shape({
    amount: Yup.number().required(),
    minimum: Yup.number().required(),
    maximum: Yup.number().required(),
  });

  const alcohols = ["소주", "맥주", "막걸리", "증류식 소주", "와인", "위스키"];

  const [isColor, setColor] = useState("grey");
  const [isColor1, setColor1] = useState("grey");
  const [isColor2, setColor2] = useState("grey");
  const [isColor3, setColor3] = useState("grey");
  const [isColor4, setColor4] = useState("grey");
  const [isColor5, setColor5] = useState("grey");

  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const getUserEmail = () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            email: doc.data().email,
            owner_uid: doc.data().owner_uid,
            name: doc.data().name,
            age: doc.data().age,
            nickname: doc.data().nickname,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserEmail();
    console.log(currentLoggedInUser);
  }, []);

  const uploadUserDrink = (amount, drink, minimum, maximum) => {
    const sendToFirebase = db.doc(firebase.auth().currentUser.email).set({
      owner_uid: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      name: firebase.auth().currentUser.name,
      age: firebase.auth().currentUser.age,
      nickname: firebase.auth().currentUser.nickname,
      amount: amount,
      drink: drink,
      minimum: minimum,
      maximum: maximum,
    });
    console.log(sendToFirebase);
    return sendToFirebase;
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          amount: "",
          drink: [],
          minimum: "",
          maximum: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          uploadUserDrink(
            values.amount,
            values.drink,
            values.minimum,
            values.maximum
          );
        }}
        validationSchema={SetDrinkSchema}
        validationOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <>
            <View
              style={{
                alignItems: "center",
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button title="이전으로" onPress={() => navigation.goBack()} />

              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "600", marginRight: 170 }}
                >
                  프로필 설정
                </Text>
              </View>
            </View>
            <Divider />
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
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  isColor === "grey" ? setColor("#C0E8E0") : setColor("grey");
                  setFieldValue("drink", ["소주"]);
                }}
                value={values.drink}
                onChangeValue={handleChange("drink")}
                style={[styles.checkBoxDesign, { backgroundColor: isColor }]}
              >
                <Text>{alcohols[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  isColor1 === "grey"
                    ? setColor1("#C0E8E0")
                    : setColor1("grey");
                  setFieldValue("drink", ["맥주"]);
                }}
                value={values.drink}
                onChangeValue={handleChange("drink")}
                style={[styles.checkBoxDesign, { backgroundColor: isColor1 }]}
              >
                <Text>{alcohols[1]}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  isColor2 === "grey"
                    ? setColor2("#C0E8E0")
                    : setColor2("grey");
                  setFieldValue("drink", ["막걸리"]);
                }}
                value={values.drink}
                style={[styles.checkBoxDesign, { backgroundColor: isColor2 }]}
              >
                <Text>{alcohols[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  isColor3 === "grey"
                    ? setColor3("#C0E8E0")
                    : setColor3("grey");
                  setFieldValue("drink", ["증류식 소주"]);
                }}
                value={values.drink}
                onChangeValue={handleChange("drink")}
                style={[styles.checkBoxDesign, { backgroundColor: isColor3 }]}
              >
                <Text>{alcohols[3]}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  isColor4 === "grey"
                    ? setColor4("#C0E8E0")
                    : setColor4("grey");
                  setFieldValue("drink", ["와인"]);
                }}
                value={values.drink}
                onChangeValue={handleChange("drink")}
                style={[styles.checkBoxDesign, { backgroundColor: isColor4 }]}
              >
                <Text>{alcohols[4]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  isColor5 === "grey"
                    ? setColor5("#C0E8E0")
                    : setColor5("grey");
                  setFieldValue("drink", ["위스키"]);
                }}
                value={values.drink}
                onChangeValue={handleChange("drink")}
                style={[styles.checkBoxDesign, { backgroundColor: isColor5 }]}
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
                onChangeText={handleChange("minimum")}
                onBlur={handleBlur("minimum")}
                value={values.minimum}
              />
              <TextInput
                style={styles.inputContent}
                placeholderTextColor="#444"
                placeholder="최대"
                textAlign="center"
                autoCapitalize="none"
                onChangeText={handleChange("maximum")}
                onBlur={handleBlur("maximum")}
                value={values.maximum}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Text style={{ marginRight: 40 }}>최소 도수</Text>
              <Text>최대 도수</Text>
            </View>
            <View
              style={{
                backgroundColor: "#C0E8E0",
                marginTop: 50,
                height: "100%",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonDesign}
                onPress={handleSubmit}
              >
                <Text
                  style={{ fontSize: 30, fontWeight: "500", color: "white" }}
                >
                  완료
                </Text>
              </TouchableOpacity>
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
    marginTop: 24,
  },
  inputField: {
    borderRadius: 4,
    padding: 13,
    backgroundColor: "#fafafa",
    margin: 12,
    borderWidth: 1,
  },
  checkBoxDesign: {
    width: "48%",
    height: 80,
    borderStyle: "solid",
    borderRadius: 20,
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  pressedCheckBox: {
    width: "48%",
    height: 80,
    borderColor: "#C0E8E0",
    backgroundColor: "#C0E8E0",
    borderStyle: "solid",
    borderRadius: 20,
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDesign: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
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

export default PreferredDrink;
