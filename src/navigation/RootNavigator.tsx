import React, { useState } from "react";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import Login from "../views/login";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { Button, View, Text, StatusBar, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedTabsScreen from "../views/MaterialTopTabs";
import { MyHeaderOptions, UserStackScreen } from "./UserNavigation";
import { Article } from "../views/Article";
import { CreateNew } from "../views/CreateNew";
import { Friend } from "../views/Friend";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useAsyncEffect } from "ahooks";
import * as SecureStore from "expo-secure-store";
import { login, logout } from "../store";
import { getUserInfo } from "../api/user";
import { checkNullObj } from "../utils/util";
import { UserState } from "../@types/model";

function Feed({ navigation }: StackScreenProps<ParamListBase>) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home screen</Text>
      <Button
        title="Go To Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#48D597",
      tabBarInactiveTintColor: "grey",
      tabBarIconStyle: { display: "none" },
      tabBarLabelStyle: { fontSize: 20 },
      tabBarItemStyle: { flexDirection: "row", justifyContent: "center" },
    }}>
      <Tab.Screen name="首页" component={FeedTabsScreen} />
      {/* TODO: 加上商城功能 */}
      {/*<Tab.Screen name="商城" component={Feed} />*/}
      <Tab.Screen name="消息" component={Feed} />
      <Tab.Screen name="创作" component={CreateNew} />
      <Tab.Screen name="我" component={UserStackScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  const dispatch = useAppDispatch();
  const userInfoByRedux = useAppSelector(state => state);
  const [isPermissionLoading, setIsPermissionLoading] = useState(true);

  useAsyncEffect(async () => {
    const getPermission = async (userinfo: UserState) => {
      if (checkNullObj(userinfo) || userinfo?.token === "") {
        dispatch(logout());
      } else {
        dispatch(login(userinfo));
        const { data: res } = await getUserInfo(userinfo.user.user_id);
        if (res.code !== 0) {
          dispatch(logout());
        }
      }
    };
    try {
      setIsPermissionLoading(true);
      let userInfoStr: string | null = null;
      if (Platform.OS !== "web") {
        userInfoStr = await SecureStore.getItemAsync("user");
        if (userInfoStr === null) {
          dispatch(logout());
        } else {
          await getPermission(JSON.parse(userInfoStr));
        }
      } else {
        if (userInfoByRedux && userInfoByRedux?.token === "") {
          dispatch(logout());
        } else {
          await getPermission(userInfoByRedux);
        }
      }
    } catch (e) {
      console.log(e);
      dispatch(logout());
    } finally {
      setIsPermissionLoading(false);
    }
  }, []);

  return (
    isPermissionLoading ? <>
    </> : <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Account" component={Login} />
          <Stack.Screen name="Home" component={HomeStackScreen} />
          <Stack.Screen name="Article" component={Article} />
          <Stack.Screen name="Friend" component={Friend} />
        </Stack.Navigator>
      </NavigationContainer>
    </>

  );
}

export default RootNavigator;
