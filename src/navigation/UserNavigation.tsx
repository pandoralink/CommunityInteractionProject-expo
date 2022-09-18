import User from "../views/user";
import React from "react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import Login from "../views/login";
import Iconfont from "../common/Iconfont";
import { ParamListBase } from "@react-navigation/native";
import UserInfo from "../views/UserInfo";
import { StyleSheet } from "react-native";
import { Article } from "../views/Article";

const Stack = createStackNavigator();

export const MyHeaderOptions = (title: string | "custom", backRouteName: string) => {
  return ({ navigation, route }: StackScreenProps<ParamListBase>) => {
    let currTitle = title;
    if(title === "custom") {
      // @ts-ignore
      const article: Article = route.params.row;
      currTitle = article.new_name;
    }
    return {
      title: currTitle,
      headerLeft: () => {
        return (
          <Iconfont
            name={"ic_back_24"}
            size={24}
            style={{ paddingLeft: 10 }}
            color={"#48D597"}
            onPress={() => navigation.navigate(backRouteName)}
          />
        );
      },
    };
  };
};

export function UserStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "grey",
        headerTitleAlign: "center",
        headerBackgroundContainerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#CFCFCF",
          borderStyle: "solid",
        },
        cardStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
      <Stack.Screen name="UserInfo" component={UserInfo} options={MyHeaderOptions("用户信息", "User")} />
      <Stack.Screen name="UserRead" component={UserInfo} options={MyHeaderOptions("我看过的", "User")} />
      <Stack.Screen name="UserCreateArticle" component={UserInfo} options={MyHeaderOptions("我的文章", "User")} />
    </Stack.Navigator>
  );
}
