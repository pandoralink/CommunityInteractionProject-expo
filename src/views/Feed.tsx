import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, Platform } from "react-native";
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

const Feed = ({ navigation, route }: StackScreenProps<ParamListBase>) => {
  if (route.name === "Focus") {
    // do something;
  }
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<ListData[]>([]);
  const [offset, setOffset] = useState<number>(0);

  async function refresh() {
    console.log("JOJO", offset);
    const { data: res } = await getArticleList(offset);
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

  const generateBoxShadowStyle = (
    xOffset: number,
    yOffset: number,
    shadowOpacity: number,
    shadowRadius: number,
    elevation: number,
  ) => {
    if (Platform.OS === "android") {
      return {
        elevation,
      };
    } else if (Platform.OS === "ios") {
      return {
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      };
    } else {
      // h5 特殊处理
      return {
        boxShadow: "0.4px 0.8px 1.2px rgb(0 0 0 / 20%)",
      };
    }
  };

  const renderRow = ({ item }: { item: ListData }) => {
    // boxShadow: "0.3px 0.3px 4px 0.5px rgb(0 0 0 / 12%)"
    return (
      <ListItem
        containerStyle={[{
          borderRadius: 16,
          marginBottom: 4,
          marginTop: 6,
          borderStyle: "solid",
          marginLeft: 2,
          marginRight: 2,
        }, generateBoxShadowStyle(0.4, 0.8, 0.2, 1.2, 2)]}
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
    backgroundColor: "#FAFAFA",
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
