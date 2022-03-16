import axiosClient from './axiosClient';

const adminAPI = {
    //Admin User
    getUserList: () => {
        const params = {
            maNhom: "GP08",
        }
        return axiosClient.get("/QuanLyNguoiDung/LayDanhSachNguoiDung", {params})
    },
    getUser: (values) => {
        const params ={
            tuKhoa:values,
            maNhom: "GP08"
        }
        return axiosClient.get("/QuanLyNguoiDung/TimKiemNguoiDung", {params})
    },
    addUser: (data) => {
        return axiosClient.post("/QuanLyNguoiDung/ThemNguoiDung", data)
    },
    updateUser: (data) => {
        const user = {...data, maNhom:'GP08'}
        return axiosClient.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
    },
    deleteUser: (values) => {
        const params={
            taiKhoan: values,
        }
        return axiosClient.delete("/QuanLyNguoiDung/XoaNguoiDung",{params})
    },
    getTypeOfUser: ()=> {
        return axiosClient.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
    }
    ,
    getListCourses: () => {
        const params = {
            maNhom: "GP08",
        }
        return axiosClient.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", {params})
    },
    addCourse: (data) => {
        return axiosClient.post("/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", data)
    },
    deleteCourse: (data) => {
        const params = {
            maKhoaHoc: data
        }
        return axiosClient.delete("/QuanLyKhoaHoc/XoaKhoaHoc", {params})
    },
    updateCourse: (data) => {
        const params = {data}
        return axiosClient.put("/QuanLyKhoaHoc/CapNhatKhoatHocUpload", {params})
    },
    getOneCourse: (courseId) => {
        const params = {
            maKhoaHoc: courseId
        }
        return axiosClient.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc", { params })
    },
    getCourseCategory: () => {
        return axiosClient.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc")
    }
}

export default adminAPI;