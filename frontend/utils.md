ex)
#### 버튼 만들기
누르면 다른 화면으로 이동하는 버튼 구현
```javascript
export default function App() {
    return
}
```


# 하단바 만들기
(reference)[https://code-masterjung.tistory.com/126]
(다양한 설정)[https://eunbin00.tistory.com/41]
(상세 설정)[https://jeffgukang.github.io/react-native-tutorial/docs/router-tutorial/02-react-navigation-tab/react-navigation-tab-kr.html]

```
npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs @react-navigation/material-top-tabs react-native-tab-view
expo install react-native-screens react-native-safe-area-context
npm install react-native-screens react-native-safe-area-context
```
[line 1] 하단바, 사이드바 등의 라이브러리
[line 2,3] 사전에 실행하기전에 깔아야 할 것들

1. NavigatorContainer 컴포넌트
   - 내비게이션의 계층 구조와 상태를 관리하는 컴포넌트
   - 모든 네비게이션 구조를 감싼 최상위

2. Navigator 컴포넌트
    - 화면으로 관리하는 중간관리자 컴포넌트
    - 여러개의 Screen을 자식으로 두고 있음
3. Screen 컴포넌트 
   - 화면으로 사용되는 컴포넌트
   - name(화면 이름), component(화면으로 사용될 컴포넌트)를 속성으로 지정해야함.

```javascript
import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  Foundation,
  FontAwesome5,
} from "@expo/vector-icons";

import { Color } from "./design"; // 우리의 메인 색깔 '#C0E8E0'

function HomeScreen() { // 하반바를 눌렀을 때 나올 화면
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>넣을 화면</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator(); // 하단바 생성

export default function App() {
  return (
    <NavigationContainer> // 네비게이터 컨테이너로 감싸줘야 네비게이터라고 인식함
      <Tab.Navigator // 상수 Tab을 받아서 네비게이터 설정
        screenOptions={() => ({ // tabBarOptions이 screenOptions로 바뀜
          tabBarActiveTintColor: Color.main, // 탭을 눌러 활성화했을 때의 색깔
          tabBarInactiveTintColor: "grey", // 활성화하지 않았을 때의 색깔
          tabBarLabelStyle: {
            fontSize: 12, // 아래 글씨 사이즈
          },
        })}
      >
        <Tab.Screen
          name="Home" // 고유 키 번호
          component={HomeScreen} // 메인 화면에 띄울 화면
          options={{
            tabBarLabel: "홈", // 탭 아래의 들어갈 글씨
            headerShown: false, // 맨 위에 헤더가 생기게 되는데 이를 없애는 옵션
            tabBarIcon: ({ focused }) => ( // focused는 탭을 눌렀을 경우 변수로 받음
              <MaterialCommunityIcons // exp에서 가져온 아이콘
                name="home"
                style={{
                  color: focused ? Color.main : "grey",
                  fontSize: focused ? 34 : 29,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

```

인스타그램 클론 코딩
- (영상)[https://www.youtube.com/watch?v=UbixZZDjrdU]
- (블로그)[https://velog.io/@anpigon/2019-04-25-0004-작성됨-eljuvdd1ys]