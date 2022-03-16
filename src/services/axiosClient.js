import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: "https://elearning0706.cybersoft.edu.vn/api",
  // Config to get default params of axios
  // Ignore null values as well as undefined of params
  paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
});

axiosClient.interceptors.request.use(
  (config) => {
    //handle save data on localStorage before request being sent to server
    //add authorization on header
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const { accessToken } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    //handle business when request have error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    //Handle return value from server
    return response;
  },
  (error) => {
    if (error.status === 401) {
      // console.log(error.response.data);
      //Handle logout, redirect user to login page
      
    }
    if (error.status === 500) {
      console.log(error.data);
      //Announce alert to user that server has error
      
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
 