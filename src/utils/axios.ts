import axios from "axios";
// import { ElMessage } from "element-plus";
import { CommonResult } from "../@types/model";
// import { useRouter } from "vue-router";

// 生产环境 URL
// const url = "/prefix";
const url = "http://114.132.66.80:3002";
// const developmentUrl = "http://localhost:3001";
const developmentUrl = "http://172.16.1.163:3001";
// const developmentUrl = "/dev-prefix";
// const developmentUrl = "http://114.132.66.80:3002";
// axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? developmentUrl : url;

axios.interceptors.response.use(
  (response) => {
    console.log(response);
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
      console.log(response);
      if (response.config.url !== "/user/detailinfo") {
        // ElMessage({
        //   showClose: true,
        //   message: res.message,
        //   type: "error",
        // });
      }
      return Promise.reject(response.data);
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
  }
);

export default axios;
