import React from "react";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import Login from "../views/login";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { Button, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopTabsScreen from "../views/MaterialTopTabs";

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

const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#48D597",
      tabBarInactiveTintColor: "grey",
      tabBarIconStyle: { display: "none" },
      tabBarLabelStyle: { fontSize: 20 },
      tabBarItemStyle: { flexDirection: "row", justifyContent: "center" },
    }}>
      <Tab.Screen name="首页" component={TopTabsScreen} />
      {/* TODO: 加上商城功能 */}
      {/*<Tab.Screen name="商城" component={Feed} />*/}
      <Tab.Screen name="消息" component={Feed} />
      <Tab.Screen name="创作" component={Feed} />
      <Tab.Screen name="我" component={Feed} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Account" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Account" component={Login} />
        <Stack.Screen name="Home" component={HomeStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
