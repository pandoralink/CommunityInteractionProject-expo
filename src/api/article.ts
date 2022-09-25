import axios from "../utils/axios";

export const getUserArticleList = (userAccount: string) => {
  return axios({
    url: "/userArticle",
    method: "get",
    params: {
      userAccount,
    },
  });
};

export const getAuthorInfo = (fan_id: number, blogger_id: number) => {
  return axios({
    url: "/authorInfo",
    method: "get",
    params: {
      fan_id,
      blogger_id,
    },
  });
};
