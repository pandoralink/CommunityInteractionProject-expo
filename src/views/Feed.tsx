import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, StatusBar, SafeAreaView, ActivityIndicator } from "react-native";
import {
  ListItem,
  Avatar,
  ListItemProps,
  Button, Image,
} from "@rneui/themed";
import Iconfont from "../common/Iconfont";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { getArticleList } from "../api/feed";

type ListData = {
  new_name: string;
  icon: string;
  route: string;
  user_name: string;
  article_cover_url: string;
};
const list: ListData[] = [
  {
    new_name: "我看过的",
    icon: "ic_eye_fill_24",
    route: "UserRead",
    user_name: "",
    article_cover_url: "",
  },
];

type ListComponentProps = ListItemProps;

const Feed = ({ navigation }: StackScreenProps<ParamListBase>) => {
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<ListData[]>([{
    new_name: "我看过的",
    icon: "ic_eye_fill_24",
    route: "UserRead",
    user_name: "",
    article_cover_url: "",
  }]);

  async function refresh() {
    const { data: res } = await getArticleList(0);
    setRefreshing(true);
    console.log(res.data);
    const temp: ListData[] = res.data;
    setList(() => [...temp, ...list]);
    setRefreshing(false);
  }

  const renderRow = ({ item }: { item: ListData }) => {
    return (
      <ListItem
        containerStyle={{ borderRadius: 16, marginBottom: 4, marginTop: 6 }}
        onPress={() => navigation.navigate("Article")}
      >
        <ListItem.Content style={{ alignSelf: "flex-start" }}>
          <ListItem.Title
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#48D597",
              paddingBottom: 4,
            }}>{item.new_name}</ListItem.Title>
          <ListItem.Subtitle
            style={{ color: "grey", paddingBottom: 4 }}>{item.user_name}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          Component={() => {
            if(item.article_cover_url) {
              return (
                <Image
                  resizeMethod={"resize"}
                  source={{
                    uri: item.article_cover_url,
                  }}
                  containerStyle={{ maxWidth: 100, maxHeight: 80, borderRadius: 25 }}
                />
              );
            } else {
              return <></>;
            }
          }}
        />
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ padding: 8 }}
        data={list}
        keyExtractor={(a: ListData, index: number) => index.toString()}
        renderItem={renderRow}
        refreshing={refreshing}
        onRefresh={refresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
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
  item: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
  },
});

export default Feed;
