import axios from "axios";
// import { ElMessage } from "element-plus";
import { CommonResult } from "../@types/model";
import { getToken } from "./auth";
import { STATUS } from "../@types/status";
import Toast from "react-native-root-toast";
// import { useRouter } from "vue-router";

// 生产环境 URL
// const url = "/prefix";
const url = "http://114.132.66.80:3002";
// const developmentUrl = "http://localhost:3001";
const developmentUrl = "http://10.34.198.197:3001";
// const developmentUrl = "/dev-prefix";
// const developmentUrl = "http://114.132.66.80:3002";
// axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? developmentUrl : url;

axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = token; // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    }
    if (config.headers) {
      config.headers["Cache-Control"] = "no-cache";
    }

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const res: CommonResult = response.data;
    // const router = useRouter();
    if (res.code === 403) {
      // ElMessage({
      //   showClose: true,
      //   message: res.message,
      //   type: "error",
      // });
      // router.push("/person/login");
    } else if (res.code === 500) {
      // ElMessage({
      //   showClose: true,
      //   message: "服务器出错了",
      //   type: "error",
      // });
      return Promise.reject(response.data);
    } else if (res.code === 400) {
      if (response.config.url !== "/user/detailinfo") {
        // ElMessage({
        //   showClose: true,
        //   message: res.message,
        //   type: "error",
        // });
      }
      return Promise.reject(response.data);
    } else if (res.code === STATUS.loginError) {
      Toast.show(res.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        delay: 0,
      });
      throw new Error(res.message);
    } else {
      return response;
    }
  },
  (error) => {
    if (error.response) {
      // ElMessage({
      //   showClose: true,
      //   message: "服务器出错了",
      //   type: "error",
      // });
      return Promise.reject(error.response.data);
    }
  },
);

export default axios;
