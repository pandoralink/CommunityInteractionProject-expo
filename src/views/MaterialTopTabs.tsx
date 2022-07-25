import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, Animated, View } from "react-native";
import React from "react";
import MyTabBarTop from "../navigation/MaterialTopTabBar";

const MaterialTopTabs = createMaterialTopTabNavigator();

function Feed({ navigation }: StackScreenProps<ParamListBase>) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home screen</Text>
      <Button
        title="Go To Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

export default function TopTabsScreen({ navigation }: StackScreenProps<ParamListBase>) {
  return (
    <MaterialTopTabs.Navigator
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
