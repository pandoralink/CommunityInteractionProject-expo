// import 'react-native-gesture-handler';
import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { Platform, SafeAreaView, StatusBar, View, StyleSheet, StatusBarProps } from "react-native";
import Constants from 'expo-constants';

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

const MyStatusBar = ({ backgroundColor, ...props }: StatusBarProps) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default function App() {

  return (
    <SafeAreaProvider>
      <MyStatusBar backgroundColor="#48D597" barStyle="light-content" />
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const STATUSBAR_HEIGHT = Constants.statusBarHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
