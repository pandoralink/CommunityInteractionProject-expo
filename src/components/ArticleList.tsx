import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, StatusBar, SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
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
// @ts-ignore
import { RefreshControl } from "react-native-web-refresh-control";
import { AxiosPromise } from "axios";

type ListData = {
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

type ListComponentProps = ListItemProps;
type ArticleListProps = {
  getDataFunc: (offset: number) => AxiosPromise<any>;
}

const ArticleList = ({ navigation, route, getDataFunc }: ArticleListProps & StackScreenProps<ParamListBase>) => {
  if(route.name === "Focus") {
    // do something;
  }
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<ListData[]>([]);
  const [offset, setOffset] = useState<number>(0);

  async function refresh() {
    console.log("JOJO", offset);
    const { data: res } = await getDataFunc(offset);
    setRefreshing(true);
    const temp: ListData[] = res.data;
    setList(() => [...temp, ...list]);
    setRefreshing(false);
  }

  const handleArticleNavigate = (row: ListData) => {
    navigation.navigate("Article", {
      row,
    });
  };

  useEffect(() => {
    refresh();
  }, [offset]);

  const renderRow = ({ item }: { item: ListData }) => {
    return (
      <ListItem
        containerStyle={{ borderRadius: 16, marginBottom: 4, marginTop: 6 }}
        onPress={() => handleArticleNavigate(item)}
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
            if (item.article_cover_url) {
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => setOffset(offset + 1)} />
        }
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

export default ArticleList;
