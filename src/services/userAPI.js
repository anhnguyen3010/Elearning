import axiosClient from "./axiosClient";

const userAPI = {
  getAccountInfo: (account) => {
    return axiosClient.post("/QuanLyNguoiDung/ThongTinTaiKhoan", account);
  },

  updateAccountInfo: (user) => {
    return axiosClient.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  },
};

export default userAPI;
