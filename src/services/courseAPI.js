import axiosClient from "./axiosClient";

const courseAPI = {
  getCourseDetail: (courseId) => {
    const params = {
      maKhoaHoc: courseId,
    };
    return axiosClient.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc", { params });
  },
};

export default courseAPI;
