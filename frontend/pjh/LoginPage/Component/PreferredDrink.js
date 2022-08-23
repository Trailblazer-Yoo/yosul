import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Divider, Slider } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../firebase";

const db = firebase.firestore();

// 문제 1 : firebase -> undefined 값이 들어간다고 나옴 (uploadUserDrink 부분 확인 중)
// 문제 2 : 선호주종 선택 -> array에 값이 안들어감.(해결)
// 문제 2-1 : 각 버튼별로 setSelect가 달라져서 이를 하나로 합치는 코드가 필요함
// 문제 2-2 : drink의 isSelect 값이 안변함
// 문제 3 : slider 변수 : console.log 찍어보니 값이 변해도 undefined로 나옴

const PreferredDrink = ({ navigation }) => {
  const SetDrinkSchema = Yup.object().shape({
    amount: Yup.number().required(),
    // drink: Yup.array().min(1).required(),
    // content: Yup.number().required(),
  });

  const [preferredContent, setPreferredContent] = useState(0);
  const alcohols = ["소주", "맥주", "막걸리", "증류식 소주", "와인", "위스키"];
  const [isSelect, setSelect] = useState([]);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const updateContent = (preferredContet) => {
    setPreferredContent(preferredContet);
    console.log(preferredContent);
  };

  const getUserEmail = () => {
    const user = firebase.auth().currentUser;
    console.log();
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
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

  const uploadUserDrink = (amount) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .add({
        owner_uid: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
        name: firebase.auth().currentUser.name,
        age: firebase.auth().currentUser.age,
        nickname: firebase.auth().currentUser.nickname,
        amount: amount,
        // degree: preferredContent,
      });
    console.log(uploadUserDrink);
    return unsubscribe;
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{
          amount: "",
          drink: { isSelect },
          content: { preferredContent },
        }}
        onSubmit={(values) => {
          console.log(values);
          uploadUserDrink(values.amount);
        }}
        validationSchema={SetDrinkSchema}
        validationOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                  style={{ fontSize: 20, fontWeight: "600", marginRight: 142 }}
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
                (중복 선택 가능)
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setSelect([...isSelect, alcohols[0]]);
                  for (var i = 0; i < isSelect.length; i++) {
                    if (isSelect[i] === alcohols[0] && isSelect.length >= 1) {
                      isSelect.splice(i, 1);
                      i--;
                    } else {
                      setSelect([...isSelect, alcohols[0]]);
                    }
                  }
                  console.log(isSelect);
                }}
                value={alcohols[0]}
                style={styles.checkBoxDesign}
              >
                <Text>{alcohols[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  for (var i = 0; i < isSelect.length; i++) {
                    if (isSelect[i] === alcohols[2] && isSelect.length >= 1) {
                      isSelect.splice(i, 1);
                      i--;
                    } else {
                      setSelect([...isSelect, alcohols[2]]);
                    }
                  }
                  console.log(isSelect);
                }}
                value={alcohols[1]}
                style={[styles.checkBoxDesign, { backgroundColor: "#C0E8F0" }]}
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
                  for (var i = 0; i < isSelect.length; i++) {
                    if (isSelect[i] === alcohols[2] && isSelect.length >= 1) {
                      isSelect.splice(i, 1);
                      i--;
                    } else {
                      setSelect([...isSelect, alcohols[2]]);
                    }
                  }
                  console.log(isSelect);
                }}
                value={alcohols[2]}
                style={[styles.checkBoxDesign, { backgroundColor: "#C0E8F0" }]}
              >
                <Text>{alcohols[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  for (var i = 0; i < isSelect.length; i++) {
                    if (isSelect[i] === alcohols[3] && isSelect.length >= 1) {
                      isSelect.splice(i, 1);
                      i--;
                    } else {
                      setSelect([...isSelect, alcohols[3]]);
                    }
                  }
                  console.log(isSelect);
                }}
                value={alcohols[3]}
                style={[styles.checkBoxDesign, { backgroundColor: "#C0E8F0" }]}
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
                  for (var i = 0; i < isSelect.length; i++) {
                    if (isSelect[i] === alcohols[4] && isSelect.length >= 1) {
                      isSelect.splice(i, 1);
                      i--;
                    } else {
                      setSelect([...isSelect, alcohols[4]]);
                    }
                  }
                  console.log(isSelect);
                }}
                value={alcohols[4]}
                style={[styles.checkBoxDesign, { backgroundColor: "#C0E8F0" }]}
              >
                <Text>{alcohols[4]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  for (var i = 0; i < isSelect.length; i++) {
                    if (isSelect[i] === alcohols[5] && isSelect.length >= 1) {
                      isSelect.splice(i, 1);
                      i--;
                    } else {
                      setSelect([...isSelect, alcohols[5]]);
                    }
                  }
                  console.log(isSelect);
                }}
                value={alcohols[5]}
                style={[styles.checkBoxDesign, { backgroundColor: "#C0E8F0" }]}
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
            <View>
              <Slider
                value={preferredContent}
                onValueChange={updateContent}
                maximumValue={50}
                minimumValue={0}
                step={10}
                trackStyle={{ height: 20 }}
                thumbStyle={{
                  height: 30,
                  width: 30,
                  backgroundColor: "#C0E8E0",
                }}
              />
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text>{preferredContent}</Text>
              </View>
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
});

export default PreferredDrink;
