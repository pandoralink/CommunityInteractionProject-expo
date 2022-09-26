import React, { useEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { Text, Divider, Image, Button, Avatar, ListItem } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import Iconfont from "../common/Iconfont";
import Icon from "../common/Iconfont";
import { Article } from "./Article";
import ArticleList from "../components/ArticleList";
import { getAuthorInfo, getUserArticleList } from "../api/article";

export function Friend({ navigation, route }: StackScreenProps<ParamListBase>) {
  // @ts-ignore
  const { row } = route.params;
  const article: Article = row;
  const url = "http://114.132.66.80:3003/userArticle/" + article.new_id +
    "??userAccount=" + article.user_id +
    "&userName=" + article.user_name +
    "&userHeadUrl=" + article.user_head +
    "&newId=" + article.new_id;

  // TODO: 引入 redux 管理登录状态
  // useEffect(async () => {
  //   const { data: res } = getAuthorInfo(article.new_owner_id, "1005");
  // });

  return (
    <>
      <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        justifyContent: "space-between",
      }}>
        <Iconfont
          name={"ic_back_24"}
          size={24}
          style={{ paddingLeft: 10, flexGrow: 0, flexShrink: 0, flexBasis: "20%" }}
          color={"#48D597"}
          onPress={() => navigation.goBack()}
        />
        <Text numberOfLines={1} ellipsizeMode={"tail"}
              style={{ fontSize: 20, color: "grey", maxWidth: "80%" }}>{"用户详情"}</Text>
        <View style={{ flexGrow: 0, flexShrink: 0, flexBasis: "20%" }}></View>
      </View>
      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white",
      }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {article.article_cover_url ? (
            <Image
              resizeMethod={"resize"}
              source={{
                uri: article.article_cover_url,
              }}
              containerStyle={{
                width: 80,
                height: 80,
                borderRadius: 25,
              }}
              PlaceholderContent={<Icon name={"ic_account_on_32"} size={64} color={"white"} />}
              placeholderStyle={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#48D597" }}
            />
          ) : (
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#48D597",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Icon name={"ic_account_on_32"} size={64} color={"white"} />
            </View>
          )}
          <View style={{
            display: "flex",
            marginLeft: 10,
            paddingBottom: 8,
            justifyContent: "space-around",
          }}>
            <Text style={{ fontSize: 16, color: "black" }}>{article.user_name}</Text>
            <View>
              <Text style={{ fontSize: 12, color: "grey" }}>{article.user_account}</Text>
              <Text
                style={{ fontSize: 12, color: "grey", marginTop: 8 }}>{article.user_name + "粉丝"}</Text>
            </View>
          </View>
        </View>
        <View>
          <Button
            containerStyle={{ width: 100 }}
            buttonStyle={{
              backgroundColor: "#48D597",
              borderRadius: 15,
            }}
            onPress={() => navigation.navigate("Home", { screen: "消息" })}
          >
            私信
          </Button>
          <Button
            containerStyle={{ width: 100, marginTop: 10 }}
            buttonStyle={{
              backgroundColor: "#48D597",
              borderRadius: 15,
            }}
          >
            关注
          </Button>
        </View>
      </View>
      <ListItem containerStyle={{ paddingHorizontal: 24, paddingLeft: 10 }}>
        <Iconfont name={"ic_article_svg_24"} size={24} color={"#48D597"} />
        <ListItem.Content
          style={{ flexDirection: "row", flexWrap: "wrap", height: "100%", alignContent: "space-around" }}>
          <ListItem.Title style={{ fontSize: 16, color: "grey", width: "100%" }}>账号名称</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Divider />
      <ArticleList
        navigation={navigation}
        route={route}
        getDataFunc={(offset) => {
          return getUserArticleList(article.user_account);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
