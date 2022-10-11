import React from "react";
import { View, StyleSheet, FlatList, StatusBar, SafeAreaView, Platform } from "react-native";
import {
  ListItem,
  Avatar,
  ListItemProps,
  Button,
} from "@rneui/themed";
import Iconfont from "../common/Iconfont";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { logout as logoutAction } from "../store/index";
import { useAppSelector, useAppDispatch } from "../hooks";
import { checkNullObj } from "../utils/util";
import * as SecureStore from "expo-secure-store";

type ListData = {
  title: string;
  icon: string;
  route: string;
};
const list: ListData[] = [
  {
    title: "我看过的",
    icon: "ic_eye_fill_24",
    route: "UserRead",
  },
  {
    title: "我的文章",
    icon: "ic_article_svg_24",
    route: "UserCreateArticle",
  },
];

type ListComponentProps = ListItemProps;

const User: React.FunctionComponent<ListComponentProps> = ({ navigation }: StackScreenProps<ParamListBase>) => {
  const userinfo = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
    navigation.navigate("Account");
  };

  const renderRow = ({ item }: { item: ListData }) => {
    return (
      <ListItem>
        <Iconfont name={item.icon} size={24} color={"#48D597"} />
        <ListItem.Content>
          <ListItem.Title style={{ fontSize: 16, color: "grey" }}>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron Component={() => {
          return (
            <Iconfont
              name={"ic_in_24"}
              size={24}
              color={"#48D597"}
              onPress={() => navigation.navigate(item.route)}
            />
          );
        }} />
      </ListItem>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <ListItem>
            <Avatar
              size={80}
              rounded
              source={require("../assets/default_head.png")}
            />
            <ListItem.Content
              style={{ flexDirection: "row", flexWrap: "wrap", height: "100%", alignContent: "space-around" }}>
              <ListItem.Title
                style={{
                  fontSize: 16,
                  color: "grey",
                  width: "100%",
                }}>{checkNullObj(userinfo.user) ? "账号名称" : userinfo.user.user_name}</ListItem.Title>
              <ListItem.Subtitle
                style={{
                  fontSize: 16,
                  color: "grey",
                  width: "100%",
                }}
              >
                {checkNullObj(userinfo.user) ? "账号" : userinfo.user.user_account}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron Component={() => {
              return (
                <Iconfont
                  name={"ic_in_24"}
                  size={24}
                  color={"#48D597"}
                  onPress={() => navigation.navigate("UserInfo")}
                />
              );
            }} />
          </ListItem>
        }
        data={list}
        keyExtractor={(a: ListData, index: number) => index.toString()}
        renderItem={renderRow}
        ListFooterComponent={
          <View style={{ alignItems: "center", padding: 8, backgroundColor: "white" }}>
            <Button
              containerStyle={{ width: 100 }}
              buttonStyle={{
                backgroundColor: "#48D597",
                borderRadius: 15,
              }}
              onPress={() => logout()}
            >
              退出账号
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  list: {},
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
});

export default User;
