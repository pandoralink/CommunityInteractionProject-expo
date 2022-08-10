import axios from "../utils/axios";

export const getArticleList = (offset: number) => {
  return axios({
    url: "/new",
    method: "get",
    params: {
      offset,
    },
  });
};
