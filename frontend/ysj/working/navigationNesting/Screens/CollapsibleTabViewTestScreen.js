import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Text
} from 'react-native';
import { TabView } from 'react-native-tab-view';

import UserProfile from '../components/Profile/UserProfile';
import CollapsibleFlatList from '../components/Profile/CollapsibleFlatList';

const TABBAR_HEIGHT = 60;

function CollapsibleTabViewTestScreen (props) {
    const [ headerHeight, setHeaderHeight ] = useState(0);
    // 탭을 직접 만들어서 사용
    const [ tabRoutes, setTabRoutes ] = useState([
        { key: "screen1", title: "내 게시물" },
        { key: "screen2", title: "찜한 게시물" },
        { key: "screen3", title: "내 전통주"}
    ])
    const [ tabIndex, setTabIndex ] = useState(0);

    /*
    useRef랑 같이 사용하는 이유
    --> UI=Component(state), 로 UI는 state가 변경될 때 component가 다시 렌더링 되게 된다.
    이때 리렌더링 되면 값이 초기값으로 적용이 되게 되는데, useRef()를 쓰면 새롭게 렌더링 되지 않고 값이 유지 되게 된다.
    애니메이션이 되고 원래 위치로 돌아가는 것을 방지하는 데 사용한다. 즉, 리렌더링 시 값이 초기화 되는 것을 막기 위해서 사용한다.
    */

    const tabIndexRef = useRef(0); 
    const isListGlidingRef = useRef(false);
    const listArrRef = useRef([]);
    const listOffsetRef = useRef({});

    /* scrollY : 드래그 할 경우에 현재 내 위치값을 가져오기 위해 -> 위치값으로 프로필 사진을 줄이거나 크게 할 수 있음 */
    const scrollY = useRef(new Animated.Value(0)).current;

    /*
    아래 interpolate를 이용해서 inputRange 값을 outputRange 값으로 변형시킴 
    input : [0, 5, 10], output : [20, 30, 100] 이라면
    값이 0일때 20, 5일때 30, 10일때, 100으로 변환해줌
    따라서 비선형적인 움직임 구현할때 사용
    */ 

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight],
        extrapolate: "clamp"
    })

    const tabBarTranslateY = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [headerHeight, 0],
        extrapolateRight: "clamp"
    });

    useEffect(()=>{
        scrollY.addListener(({ value })=>{});

        return () => {
            scrollY.removeListener();
        }
    }, []);

    const headerOnLayout = useCallback((event)=>{
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    }, []);

    const onTabIndexChange = useCallback((id)=>{
        setTabIndex(id);
        tabIndexRef.current = id;
    }, []);

    const onTabPress = useCallback((idx)=>{
        if(!isListGlidingRef.current) {
            setTabIndex(idx);
            tabIndexRef.current = idx;
        }
    }, []);

    const syncScrollOffset = ()=>{
        const focusedTabKey = tabRoutes[tabIndexRef.current].key;

        listArrRef.current.forEach((item)=>{
            if (item.key !== focusedTabKey) {
                if (scrollY._value < headerHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffsetRef.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= headerHeight) {
                    if ( listOffsetRef.current[item.key] < headerHeight ||
                         listOffsetRef.current[item.key] === null) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: headerHeight,
                                aniamted: false,
                            });
                            listOffsetRef.current[item.key] = headerHeight;
                        }
                    }
                }
            } else{
                if (item.value) {
                    listOffsetRef.current[item.key] = scrollY._value;
                }
            }
        })
    }

    const onMomentumScrollBegin = useCallback(()=>{
        isListGlidingRef.current = true;
    }, []);
    const onMomentumScrollEnd = useCallback(()=>{
        isListGlidingRef.current = false;
        syncScrollOffset();
    }, [ headerHeight ]);
    const onScrollEndDrag = useCallback(()=>{
        syncScrollOffset();
    }, [ headerHeight ]);
    
    // 중단 탭을 누를 경우 해당 컴포넌트를 렌더링하는 코드
    const renderTabBar = useCallback((props)=>{
        return (
            <Animated.View style={[ styles.collapsibleTabBar, { transform: [ { translateY: tabBarTranslateY } ] } ]}>
                {
                    props.navigationState.routes.map((route, idx) => {
                        return (
                            <TouchableOpacity
                                delayPressIn={0}
                                style={styles.collapsibleTabBarButton}
                                key={idx}
                                onPress={()=>{ onTabPress(idx); }}
                            >
                                <View style={styles.collapsibleTabBarLabelContainer}>
                                    <Text style={styles.collapsibleTabBarLabelText}>{route.title}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }        
            </Animated.View>
        )
    }, [ headerHeight ]);
    // 중단 탭에 관련된 코드
    const renderScene = useCallback(({ route })=>{
        const isFocused = route.key === tabRoutes[tabIndex].key;
    
        return (<CollapsibleFlatList headerHeight={headerHeight} tabBarHeight={TABBAR_HEIGHT} scrollY={scrollY}
                onMomentumScrollBegin={onMomentumScrollBegin} onMomentumScrollEnd={onMomentumScrollEnd} onScrollEndDrag={onScrollEndDrag}
                tabRoute={route} listArrRef={listArrRef} isTabFocused={isFocused}
                />)
    }, [ headerHeight, tabIndex ]);

    return (
        <View style={styles.rootContainer}>
            {
                headerHeight > 0?
                <TabView
                    navigationState={{ index: tabIndex, routes: tabRoutes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={onTabIndexChange}
                />:
                null
            }
            <Animated.View style={{ ...styles.headerContainer, transform: [ { translateY: headerTranslateY } ] }} onLayout={headerOnLayout} pointerEvents="box-none">
                <UserProfile />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        position: "absolute",
        width: "100%",
    },
    collapsibleTabBar: {
        flexDirection: "row",
        alignItems: "center",
        height: TABBAR_HEIGHT,
        backgroundColor: "#FFFFFF",
        zIndex: 1,
    },
    collapsibleTabBarButton: {
        flex: 1,
    },
    collapsibleTabBarLabelContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
    },
    collapsibleTabBarLabelText: {
        fontSize: 15,
        color: "#587058"
    },
});

export default CollapsibleTabViewTestScreen;