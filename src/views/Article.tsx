import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { Text, Divider } from "@rneui/themed";

export function Article() {
  return (
    <>
      <View style={{ alignItems: "center", backgroundColor: "white", padding: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 20, color: "grey" }}>发文章</Text>
      </View>
      <Divider />
      <WebView
        style={styles.container}
        source={{ uri: "https://www.baidu.com/" }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
