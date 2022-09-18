import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { Text, Divider } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import Iconfont from "../common/Iconfont";

export type Article = {
  new_id: number;
  new_owner_id: number;
  new_name: string;
  article_cover_url: string;
  detail: string;
  user_id: number;
  user_name: string;
  user_account: string;
  user_head: string;
};

export function Article({ navigation, route }: StackScreenProps<ParamListBase>) {
  // @ts-ignore
  const { row } = route.params;
  const article: Article = row;
  const url = "http://114.132.66.80:3003/article/" + article.new_id +
    "?userId=" + article.user_id +
    "&userName=" + article.user_name +
    "&userHeadUrl=" + article.user_head +
    "&newId=" + article.new_id;

  console.log(url);

  return (
    <>
      <View style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        marginTop: 20,
      }}>
        <Iconfont
          name={"ic_back_24"}
          size={24}
          style={{ paddingLeft: 10, flexGrow: 0, flexShrink: 0, flexBasis: "20%" }}
          color={"#48D597"}
          onPress={() => navigation.goBack()}
        />
        <Text numberOfLines={1} ellipsizeMode={"tail"}
              style={{ fontSize: 20, color: "grey", maxWidth: "80%" }}>{article.new_name}</Text>
        <View style={{ flexGrow: 0, flexShrink: 0, flexBasis: "20%" }}></View>
      </View>
      <Divider />
      {Platform.OS === "web" ? (
        <iframe src={url} style={{height: '100%'}}></iframe>
      ) : (
        <WebView
          style={styles.container}
          source={{ uri: url }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
