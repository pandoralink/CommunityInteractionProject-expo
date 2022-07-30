import {
  Button,
  CheckBox,
  Input,
  Text,
} from "@rneui/themed";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Icon from "../common/Iconfont";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

export default function UserInfo({ navigation }: StackScreenProps<ParamListBase>) {
  const [notShowPassword, setNotShowPassword] = useState(true);
  const isNotWeb = Platform.OS === "web";
  return (
    <>
      <View style={{ paddingHorizontal: 8, paddingTop: 20, marginBottom: 10 }}>
        <Input
          placeholder="输入账号"
          leftIcon={
            <Icon name={"ic_account_on_32"} size={32} color={"#48D597"} />
          }
          containerStyle={{
            flexDirection: "row",
            alignItems: "center",
            height: 60,
            backgroundColor: "#F1F1F1",
            borderRadius: 15,
            paddingVertical: 14,
          }}
          inputContainerStyle={{
            borderBottomColor: "transparent",
            width: "100%",
          }}
          inputStyle={[
            styles.inputStyle,
            isNotWeb ? {
              // @ts-ignore 去除 H5 focus 状态黄色边框
              outline: "none",
            } : {},
          ]}
          placeholderTextColor={"grey"}
        />
      </View>
      <View style={{ paddingHorizontal: 8 }}>
        <Input
          placeholder="输入密码"
          leftIcon={
            <Icon name={"ic_forget_password_32"} size={32} color={"#48D597"} />
          }
          rightIcon={
            <Icon
              name={notShowPassword ? "ic_eye_slash_fill_32" : "ic_eye_fill_24"}
              size={32}
              color={"#48D597"}
              onPress={() => setNotShowPassword(!notShowPassword)}
            />
          }
          containerStyle={{
            flexDirection: "row",
            alignItems: "center",
            height: 60,
            backgroundColor: "#F1F1F1",
            borderRadius: 15,
            paddingVertical: 14,
          }}
          inputContainerStyle={{
            borderBottomColor: "transparent",
            width: "100%",
          }}
          inputStyle={[
            styles.inputStyle,
            isNotWeb ? {
              // @ts-ignore 去除 H5 focus 状态黄色边框
              outline: "none",
            } : {},
          ]}
          placeholderTextColor={"grey"}
          secureTextEntry={notShowPassword}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="确认修改"
          buttonStyle={{
            backgroundColor: "#48D597",
            borderRadius: 15,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    backgroundColor: "#F1F1F1",
    borderRadius: 15,
  },
  buttonsContainer: {
    paddingTop: 32,
    paddingHorizontal: 40,
    width: "100%",
  },
  inputStyle: {
    color: "grey",
  },
});
