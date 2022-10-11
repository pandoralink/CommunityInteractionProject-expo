import axios from "../utils/axios";

export const login = (username: string, password: string) => {
  return axios({
    url: "/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
};

export const getUserInfo = (userId: number) => {
  return axios({
    url: "/userInfo",
    method: "get",
    params: {
      userId,
    },
  });
};
