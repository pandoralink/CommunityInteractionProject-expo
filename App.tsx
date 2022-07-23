import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import Login from './login';

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}
