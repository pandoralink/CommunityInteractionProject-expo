import React, { useState } from "react";
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
];

type ListComponentProps = ListItemProps;

const Feed = ({ navigation }: StackScreenProps<ParamListBase>) => {
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<ListData[]>([{
    title: "我看过的",
    icon: "ic_eye_fill_24",
    route: "UserRead",
  }]);

  async function refresh() {
    const { data } = await getArticleList(0);
    console.log(data);
    setRefreshing(true);
    const temp: ListData[] = [];
    for (let i = 0; i < 10; i++) {
      temp.push({
        title: "我看过的",
        icon: "ic_eye_fill_24",
        route: "UserRead",
      });
    }
    setList(() => [...list, ...temp]);
    setRefreshing(false);
  }

  const renderRow = ({ item }: { item: ListData }) => {
    return (
      <ListItem containerStyle={{ borderRadius: 16, marginBottom: 4, marginTop: 6 }}>
        <ListItem.Content style={{ alignSelf: "flex-start" }}>
          <ListItem.Title
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#48D597",
              paddingBottom: 4,
            }}>{item.title}</ListItem.Title>
          <ListItem.Subtitle
            style={{ color: "grey", paddingBottom: 4 }}>{item.title}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          Component={() => {
            return (
              <Image
                resizeMethod={"resize"}
                source={require("../assets/background.jpg")}
                containerStyle={{ width: 100, height: 80, borderRadius: 25 }}
              />
            );
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
