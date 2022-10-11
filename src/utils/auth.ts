import Cookies from "js-cookie";
import { store } from "../store";

const TokenKey = "token";

export function getToken() {
  const state = store.getState();
  return Cookies.get(TokenKey) || state.token;
}

// export function setToken(token) {
//   return Cookies.set(TokenKey, token);
// }
//
// export function removeToken() {
//   return Cookies.remove(TokenKey);
// }
//
// /**
//  * 存储localStorage
//  */
// export const setStore = (name, content) => {
//   if (!name) return;
//   if (typeof content !== "string") {
//     content = JSON.stringify(content);
//   }
//   window.localStorage.setItem(name, content);
// };
//
// /**
//  * 获取localStorage
//  */
// export const getStore = (name, isString = false) => {
//   if (!name) return;
//   var data = name;
//   try {
//     if (isString) {
//       data = window.localStorage.getItem(name);
//     } else {
//       data = JSON.parse(window.localStorage.getItem(name));
//     }
//   } catch (d) {
//     data = window.localStorage.getItem(name);
//   }
//   return data;
// };
//
// /**
//  * 删除localStorage
//  */
// export const removeStore = name => {
//   if (!name) return;
//   window.localStorage.removeItem(name);
// };

// /**
//  * 储存cookie
//  */
// export const setCookie = (cName, value, expiredays) => {
//   const exdate = new Date();
//   exdate.setDate(exdate.getDate() + expiredays);
//   document.cookie =
//     cName +
//     "=" +
//     escape(value) +
//     (expiredays === null ? "" : ";expires=" + exdate.toGMTString()) +
//     ";path=/";
// };
//
// /**
//  * 获取cookie
//  */
// export const getCookie = (name: string) => {
//   let arr;
//   const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//   if ((arr = document.cookie.match(reg))) {
//     return unescape(arr[2]);
//   } else {
//     return null;
//   }
// };
//
// /**
//  * 删除cookie
//  */
// export const delCookie = name => {
//   var exp = new Date();
//   exp.setTime(exp.getTime() - 1);
//   var cval = getCookie(name);
//   if (cval !== null) {
//     document.cookie =
//       name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
//   }
// };

