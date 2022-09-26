import React from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { Text, Divider, Image, Button } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import Iconfont from "../common/Iconfont";
import Icon from "../common/Iconfont";

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

  const handleArticleNavigate = (row: Article) => {
    navigation.navigate("Friend", {
      row,
    });
  };

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
      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "white",
      }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            resizeMethod={"resize"}
            source={{
              uri: article.article_cover_url,
            }}
            containerStyle={{ width: 50, height: 50, borderRadius: 25 }}
            PlaceholderContent={<Icon name={"ic_account_on_32"} size={32} color={"white"} />}
            placeholderStyle={{ width: 50, height: 50, backgroundColor: "#48D597" }}
            onPress={() => handleArticleNavigate(article)}
          />
          <Text style={{ marginLeft: 10, fontSize: 20, color: "grey" }}>{article.user_name}</Text>
        </View>
        <Button
          containerStyle={{ width: 100 }}
          buttonStyle={{
            backgroundColor: "#48D597",
            borderRadius: 15,
          }}
        >
          关注
        </Button>
      </View>
      {Platform.OS === "web" ? (
        <iframe src={url} style={{ height: "100%" }}></iframe>
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
