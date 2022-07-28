import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList, StatusBar, SafeAreaView } from "react-native";
import {
  Text,
  ListItem,
  Avatar,
  Icon,
  Badge,
  ListItemProps,
  Button,
  Switch,
} from "@rneui/themed";
import Iconfont from "../common/Iconfont";

const log = () => console.log("this is an example method");

type List1Data = {
  title: string;
  icon: string;
};
const list1: List1Data[] = [
  {
    title: "我看过的",
    icon: "ic_eye_fill_24",
  },
  {
    title: "我的文章",
    icon: "ic_article_svg_24",
  },
];

type List2Data = {
  name: string;
  avatar_url: string;
  subtitle: string;
  linearGradientColors: string[];
};

const list2: Partial<List2Data>[] = [
  {
    name: "Amy Farha",
    avatar_url: "https://uifaces.co/our-content/donated/XdLjsJX_.jpg",
    subtitle: "Vice President",
    linearGradientColors: ["#FF9800", "#F44336"],
  },
  {
    name: "Chris Jackson",
    avatar_url: "https://uifaces.co/our-content/donated/KtCFjlD4.jpg",
    subtitle: "Vice Chairman",
    linearGradientColors: ["#3F51B5", "#2196F3"],
  },
  {
    name: "Amanda Martin",
    avatar_url:
      "https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=047fade70e80ebb22ac8f09c04872c40",
    subtitle: "CEO",
    linearGradientColors: ["#FFD600", "#FF9800"],
  },
  {
    name: "Christy Thomas",
    avatar_url: "https://randomuser.me/api/portraits/women/48.jpg",
    subtitle: "Lead Developer",
    linearGradientColors: ["#4CAF50", "#8BC34A"],
  },
  {
    name: "Melissa Jones",
    avatar_url:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwMDQ0NDk1OV5BMl5BanBnXkFtZTcwNDcxOTExNg@@._V1_UY256_CR2,0,172,256_AL_.jpg",
    subtitle: "CTO",
    linearGradientColors: ["#F44336", "#E91E63"],
  },
];

type ListComponentProps = ListItemProps;

const User: React.FunctionComponent<ListComponentProps> = () => {
  const [expanded, setExpanded] = React.useState(false);

  const listItemProps = {};
  const renderRow = ({ item }: { item: List1Data }) => {
    return (
      <ListItem>
        <Iconfont name={item.icon} size={24} color={"#48D597"} />
        <ListItem.Content>
          <ListItem.Title style={{ fontSize: 16, color: "grey" }}>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron Component={() => {
          return (
            <Iconfont name={"ic_in_24"} size={16} color={"#48D597"} />
          );
        }} />
      </ListItem>
    );
  };
  const [switch1, setSwitch1] = useState(true);
  const [checkbox1, setCheckbox1] = useState(true);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <ListItem>
            <Avatar
              size={80}
              rounded
              title="P"
              source={require("../assets/default_head.png")}
            />
            <ListItem.Content
              style={{ flexDirection: "row", flexWrap: "wrap", height: "100%", alignContent: "space-around" }}>
              <ListItem.Title
                style={{ fontSize: 16, color: "grey", width: "100%" }}>账号名称</ListItem.Title>
              <ListItem.Subtitle
                style={{ fontSize: 16, color: "grey", width: "100%" }}>账号</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron Component={() => {
              return (
                <Iconfont name={"ic_in_24"} size={16} color={"#48D597"} />
              );
            }} />
          </ListItem>
        }
        data={list1}
        keyExtractor={(a: List1Data, index: number) => index.toString()}
        renderItem={renderRow}
        ListFooterComponent={
          <View style={{ alignItems: "center", padding: 8, backgroundColor: "white" }}>
            <Button
              containerStyle={{ width: 100 }}
              buttonStyle={{
                backgroundColor: "#48D597",
                borderRadius: 15,
              }}
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
