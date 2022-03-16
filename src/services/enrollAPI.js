import axiosClient from "./axiosClient";

const enrollAPI = {
  enrollCourse: (values) => {
    return axiosClient.post("/QuanLyKhoaHoc/DangKyKhoaHoc", values);
  },
  cancelCourse: (values) => {
    return axiosClient.post("/QuanLyKhoaHoc/HuyGhiDanh", values);
  },
};

export default enrollAPI;
