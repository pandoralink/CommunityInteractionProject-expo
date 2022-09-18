import axios from "../utils/axios";

export const getArticleList = (offset: number) => {
  return axios({
    url: "/article",
    method: "get",
    params: {
      offset,
    },
  });
};
