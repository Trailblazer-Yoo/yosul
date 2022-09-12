import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import firebase from "../../firebase";

const db = firebase.firestore();
const window = Dimensions.get("window");

const SearchBar = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [TagList, setTagList] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    getfirebase();
  }, []);

  const getfirebase = async () => {
    const dataSnapShot = (
      await db.collection("global").doc("tags").get()
    ).data();

    // count가 많은 순으로 정렬
    const data = Object.keys(dataSnapShot).sort(function (a, b) {
      return dataSnapShot[b].count - dataSnapShot[a].count;
    });

    setfilterdData(data);
    setmasterData(data);

    setLoading(true);
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (TagList.length === 3) {
            Alert.alert(
              "알림",
              "태그는 최대 3개까지 가능합니다. 완료 버튼을 눌러주세요."
            );
            return;
          } else if (!!TagList.find((element) => element === item)) {
            Alert.alert("중복오류", "해당 태그가 이미 존재합니다.");
            return;
          } else {
            // searchFilter(item.tag); // 리스트 중에 하나를 누르면 input에 텍스트를 넣어줌
            setTagList(TagList.concat(item));
            setsearch("");
          }
        }}
      >
        <Text style={styles.itemStyle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const TagView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          Alert.alert("삭제", "정말 이 태그를 삭제하시겠습니까?", [
            // 버튼 배열
            {
              text: "아니요",
              style: "cancel",
            },
            {
              text: "네",
              onPress: () => {
                setTagList(TagList.filter((array) => array !== item));
              },
            },
          ])
        }
      >
        <Text style={styles.tagview}>#{item} X</Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item ? item : "".toUpperCase();
        return itemData.indexOf(text) > -1;
      });
      setfilterdData(newData);
      setsearch(text);
    } else {
      setfilterdData(masterData);
      setsearch(text);
    }
  };

  const submit = (text) => {
    if (text === "") {
      Alert.alert("오류", "태그를 입력해주세요");
      return;
    } else if (TagList.length === 3) {
      Alert.alert(
        "오류",
        "태그는 최대 3개까지 가능합니다. 완료 버튼을 눌러주세요."
      );
      return;
    } else if (!!TagList.find((element) => element === text)) {
      Alert.alert("중복오류", "해당 태그가 이미 존재합니다.");
      return;
    } else {
      setTagList(TagList.concat(text));
      setsearch("");
    }
  };

  const changePass = () => {
    const arr = [];
    for (let i = 0; i < TagList.length; i++) {
      arr.push(TagList[i]);
    }
    console.log(arr);
    navigation.navigate("UploadPost", { tags: arr });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading === false ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color="grey"
            style={{ marginTop: 10 }}
            size="large"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FlatList
              style={{ padding: 5 }}
              data={TagList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={TagView}
              horizontal={true}
            />
            {TagList.length > 0 ? (
              <TouchableOpacity style={{ marginRight: 7 }} onPress={changePass}>
                <Text style={{ fontSize: 15 }}>완료</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.textInputStyle}>
            <TextInput
              // autoComplete={false}
              autoCapitalize="none"
              autoCorrect={false}
              value={search}
              placeholder="태그를 검색해주세요"
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                if (text.includes(" ")) {
                  searchFilter(text.trim());
                } else {
                  searchFilter(text);
                }
              }}
              onSubmitEditing={() => submit(search)}
            />
            {TagList.length === 3 ? (
              // 만약 태그가 3개 꽉 찼다면
              <></>
            ) : (
              // <View style={{ justifyContent: "center" }}>
              //   <Text style={{ fontSize: 15, color: "gray" }}></Text>
              // </View>
              // 아직 안찼다면
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={() => {
                  if (search === "") {
                    Alert.alert("오류", "태그를 입력해주세요");
                    return;
                  } else if (TagList.length === 3) {
                    Alert.alert(
                      "오류",
                      "태그는 최대 3개까지 가능합니다. 완료 버튼을 눌러주세요."
                    );
                    return;
                  } else if (!!TagList.find((element) => element === search)) {
                    Alert.alert("중복오류", "해당 태그가 이미 존재합니다.");
                    return;
                  } else {
                    // searchFilter(item.tag); // 리스트 중에 하나를 누르면 input에 텍스트를 넣어줌
                    setTagList(TagList.concat(search));
                    setsearch("");
                  }
                }}
              >
                <Text style={styles.addbutton}>추가</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            data={filterdData}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  itemStyle: {
    padding: 15,
  },
  addbutton: {
    fontSize: 15,
  },
  tagview: {
    margin: 5,
    color: "gray",
  },
  textInputStyle: {
    height: window.height / 23,
    width: window.width / 1.025,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
});
