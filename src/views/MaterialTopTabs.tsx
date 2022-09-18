import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, Animated, View } from "react-native";
import React from "react";
import MyTabBarTop from "../navigation/MaterialTopTabBar";
import Feed from "./Feed";

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function FeedTabsScreen({ navigation }: StackScreenProps<ParamListBase>) {
  return (
    <MaterialTopTabs.Navigator
      initialRouteName={'Recommend'}
      tabBar={props => <MyTabBarTop {...props} />}
    >
      <MaterialTopTabs.Screen
        name="Focus"
        component={Feed}
        options={{ title: "关注" }}
      />
      <MaterialTopTabs.Screen
        name="Recommend"
        component={Feed}
        options={{ title: "推荐" }}
      />
    </MaterialTopTabs.Navigator>
  );
}
