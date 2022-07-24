import {
  Button,
  CheckBox,
  Input,
  Text,
} from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "../common/Iconfont";
import { MaterialIcons } from "@expo/vector-icons";

export default function Login() {
  const [notShowPassword, setNotShowPassword] = useState(true);
  const [check4, setCheck4] = useState(false);
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
        }}>
        <Icon name={"ic_book_128"} size={128} color={"#48D597"} />
      </View>
      <View style={{ paddingHorizontal: 8, marginBottom: 10 }}>
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
            {
              // @ts-ignore 去除 H5 focus 状态黄色边框
              outline: "none",
            },
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
            {
              // @ts-ignore 去除 H5 focus 状态黄色边框
              outline: "none",
            },
          ]}
          placeholderTextColor={"grey"}
          secureTextEntry={notShowPassword}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 8,
          marginBottom: 30,
        }}>
        <CheckBox
          center
          title="记住密码"
          containerStyle={{
            backgroundColor: "transparent",
            padding: 0,
            marginLeft: 0,
          }}
          textStyle={{ color: "grey", marginLeft: 6 }}
          checkedIcon={
            <MaterialIcons
              name="radio-button-checked"
              type="material"
              color="#48D597"
              size={24}
            />
          }
          uncheckedIcon={
            <MaterialIcons
              name="radio-button-unchecked"
              type="material"
              color="grey"
              size={24}
            />
          }
          checked={check4}
          onPress={() => setCheck4(!check4)}
        />
        <Text style={{ color: "grey" }}>注册</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="登录"
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
  contentView: {
    flex: 1,
  },
  buttonsContainer: {
    paddingHorizontal: 40,
    width: "100%",
  },
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
  inputStyle: {
    color: "grey",
  },
});
