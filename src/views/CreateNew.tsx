import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { Text, Divider } from "@rneui/themed";

export function CreateNew() {
  return (
    <>
      <View style={{ alignItems: "center", backgroundColor: "white", padding: 10 }}>
        <Text style={{ fontSize: 20, color: "grey" }}>发文章</Text>
      </View>
      <Divider />
      {Platform.OS === "web" ? (
        <iframe src={"https://www.baidu.com/"} style={{ height: "100%" }}></iframe>
      ) : (
        <WebView
          style={styles.container}
          source={{ uri: "https://www.baidu.com/" }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
