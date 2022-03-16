import axiosClient from "./axiosClient";

const categoryAPI = {

    getCategory: () => {
      return axiosClient.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
    },
  };
  
  export default categoryAPI;
  