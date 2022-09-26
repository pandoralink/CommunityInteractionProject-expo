import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import {
  ParamListBase,
  Route,
  TabNavigationState,
  useTheme,
} from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabBar, TabBarIndicator } from "react-native-tab-view";

export default function MyTabBarTop({ state, navigation, descriptors, ...rest }: MaterialTopTabBarProps) {
  const { colors } = useTheme();

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const activeColor = "#48D597";
  const inactiveColor = "grey";

  return (
    <View style={{
      width: "100%",
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderBottomColor: "#CFCFCF",
      borderStyle: "solid",
    }}>
      <TabBar
        {...rest}
        navigationState={state}
        scrollEnabled={focusedOptions.tabBarScrollEnabled}
        bounces={focusedOptions.tabBarBounces}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
        pressColor={focusedOptions.tabBarPressColor}
        pressOpacity={focusedOptions.tabBarPressOpacity}
        tabStyle={{ paddingBottom: 0 }}
        indicatorStyle={[
          { backgroundColor: colors.primary },
          { backgroundColor: "#48D597" },
        ]}
        indicatorContainerStyle={focusedOptions.tabBarIndicatorContainerStyle}
        contentContainerStyle={focusedOptions.tabBarContentContainerStyle}
        style={[{ backgroundColor: colors.card }, { shadowColor: "white", marginBottom: 8, width: 136, alignSelf: "center" }]}
        getAccessibilityLabel={({ route }) =>
          descriptors[route.key].options.tabBarAccessibilityLabel
        }
        getTestID={({ route }) => descriptors[route.key].options.tabBarTestID}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          }
        }}
        onTabLongPress={({ route }) =>
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];

          if (options.tabBarShowIcon === false) {
            return null;
          }

          if (options.tabBarIcon !== undefined) {
            const icon = options.tabBarIcon({ focused, color });

            return (
              <View style={[styles.icon, options.tabBarIconStyle]}>{icon}</View>
            );
          }

          return null;
        }}
        renderLabel={({ route, focused, color }) => {
          const { options } = descriptors[route.key];

          if (options.tabBarShowLabel === false) {
            return null;
          }

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : (route as Route<string>).name;

          if (typeof label === "string") {
            return (
              <Text
                style={[styles.label, { color }, { fontSize: 20 }]}
                allowFontScaling={options.tabBarAllowFontScaling}
              >
                {label}
              </Text>
            );
          }

          return label({ focused, color });
        }}
        renderBadge={({ route }) => {
          const { tabBarBadge } = descriptors[route.key].options;

          return tabBarBadge?.() ?? null;
        }}
        renderIndicator={({ navigationState: state, ...rest }) => {
          return focusedOptions.tabBarIndicator ? (
            focusedOptions.tabBarIndicator({
              state: state as TabNavigationState<ParamListBase>,
              ...rest,
            })
          ) : (
            <TabBarIndicator navigationState={state} {...rest} />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  label: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 13,
    margin: 4,
    backgroundColor: "transparent",
  },
});
