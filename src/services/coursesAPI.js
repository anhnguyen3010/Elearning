import axiosClient from "./axiosClient";

const coursesAPI = {
  getCourses: () => {
    const params = {
      maNhom: "GP08",
    };
    return axiosClient.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", { params });
  },
  
  getCoursesByCategory: (category) => {
    const params = {
      maDanhMuc: category,
      maNhom: "GP08",
    };
    return axiosClient.get("/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", {
      params,
    });
  },

  getCoursesByEnroll: (courseName) => {
    const params = {
      tenKhoaHoc: courseName,
      maNhom: "GP08",
    };
    return axiosClient.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params,
    });
  },
};

export default coursesAPI;
