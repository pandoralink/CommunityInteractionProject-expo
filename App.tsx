// import 'react-native-gesture-handler';
import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
