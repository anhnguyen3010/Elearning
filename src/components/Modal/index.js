import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogContent, DialogTitle, useMediaQuery, MenuItem, Slide, TextField } from "@material-ui/core";
import { useTheme, withStyles, makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import { addNewCourse, getAllCategories, updateCourse, getOneCategory, getOneCourse } from "src/actions/adminCourse";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  inputText: {
    padding: 10,
  },
  dialogHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal(props) {
  const { selectedCourse, openModal, edit, onClick, onClose, ...rest } = props;

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const dispatch = useDispatch();

  const { courseUpdate, error, categoryList } = useSelector(
    (state) => state.adminCourse
  );  

  useEffect(() => {
    dispatch(getAllCategories());    
    if(selectedCourse) {
      dispatch(getOneCourse(selectedCourse.maKhoaHoc));
    }
  }, []);

  const { taiKhoan } = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      "&:hover": {
        backgroundColor: purple[700],
      },
    },
  }))(Button);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maKhoaHoc: selectedCourse ? courseUpdate.maKhoaHoc : "",
      biDanh: selectedCourse ? courseUpdate.biDanh : "",
      tenKhoaHoc: selectedCourse ? courseUpdate.tenKhoaHoc : "",
      moTa: selectedCourse ? courseUpdate.moTa : "",
      taiKhoanNguoiTao: selectedCourse ? [courseUpdate.nguoiTao].flat().map(item => item.taiKhoan) : taiKhoan,
      ngayTao: selectedCourse ? courseUpdate.ngayTao : "",
      maNhom: selectedCourse ? courseUpdate.maNhom : "GP08",
      luotXem: selectedCourse ? courseUpdate.luotXem : 0,
      danhGia: selectedCourse ? courseUpdate.danhGia : 0,
      maDanhMucKhoaHoc: selectedCourse ? [courseUpdate.danhMucKhoaHoc].flat().map(item => item.maDanhMucKhoahoc) : "BackEnd",
      hinhAnh: selectedCourse ? courseUpdate.hinhAnh : "",
    },
    validationSchema: Yup.object({
      maKhoaHoc: Yup.string()
        .lowercase("Must be in lowercase")
        .min(5, "Expected minimum 5 characters")
        .max(15, "Maximum 15 characters")
        .required("This field is required."),
      biDanh: Yup.string().lowercase("Must be in lowercase").required("This field is required."),
      tenKhoaHoc: Yup.string().required("This field is required."),
      moTa: Yup.string().nullable(),
      taiKhoanNguoiTao: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]*$/,
          "Invalid characters"
        )
        .min(5, "Use from 5 to 20 characters for your account.")
        .max(20, "Use from 5 to 20 characters for your account.")
        .required("This field is required."),
      ngayTao: Yup.string().matches(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/, "Must be in the form of dd/MM/yyyy").required("This field is required"),
      maNhom: Yup.string().required("This field is required."),
      luotXem: Yup.number(),
      danhGia: Yup.number(),
      maDanhMucKhoaHoc: Yup.string().required("This field is required."),
      hinhAnh: Yup.mixed().test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    }),
    onReset: () => {
      console.log("Formik reset !!!");
    },
    onSubmit: async (values) => {
      try {
        if (!selectedCourse) {
          dispatch(addNewCourse(values));
        } else {
          dispatch(updateCourse(values));
        }
        console.log(formik.values);
      } catch (e) {
        console.log(e);
      }
    },
    onClose: () => {
      console.log("Formik closed !!!");
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("hinhAnh", event.target.files[0]);
  };

  return (
    <div>
      <ColorButton variant="outlined" color="primary" onClick={onClick}>
        {edit ? "Edit Course" : "Add new Course"}
      </ColorButton>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openModal}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          className={classes.dialogHeader}
          id="responsive-dialog-title"
        >
          {edit ? "EDIT COURSE" : "ADD NEW COURSE"}
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <DialogContent dividers>
            <TextField
              label="Ma Khoa Hoc"
              id="maKhoaHoc"
              variant="outlined"
              name="maKhoaHoc"
              fullWidth
              className={classes.inputText}
              value={formik.values.maKhoaHoc}
              onChange={formik.handleChange}
              helperText={formik.touched.maKhoaHoc && formik.errors.maKhoaHoc}
              error={
                formik.touched.maKhoaHoc && Boolean(formik.errors.maKhoaHoc)
              }
            />
            <TextField
              label="Bi Danh"
              id="biDanh"
              name="biDanh"
              variant="outlined"
              fullWidth
              className={classes.inputText}
              value={formik.values.biDanh}
              onChange={formik.handleChange}
              helperText={formik.touched.biDanh && formik.errors.biDanh}
              error={formik.touched.biDanh && Boolean(formik.errors.biDanh)}
            />
            <TextField
              label="Ten Khoa Hoc"
              id="tenKhoaHoc"
              name="tenKhoaHoc"
              variant="outlined"
              fullWidth
              value={formik.values.tenKhoaHoc}
              className={classes.inputText}
              onChange={formik.handleChange}
              helperText={formik.touched.tenKhoaHoc && formik.errors.tenKhoaHoc}
              error={
                formik.touched.tenKhoaHoc && Boolean(formik.errors.tenKhoaHoc)
              }
            />
            <TextField
              label="Mo Ta"
              id="moTa"
              name="moTa"
              variant="outlined"
              fullWidth
              className={classes.inputText}
              value={formik.values.moTa}
              onChange={formik.handleChange}
              helperText={formik.touched.moTa && formik.errors.moTa}
              error={formik.touched.moTa && Boolean(formik.errors.moTa)}
            />
            <TextField
              label="Ma Nhom"
              id="maNhom"
              name="maNhom"
              variant="outlined"
              fullWidth
              className={classes.inputText}
              value={formik.values.maNhom}
              onChange={formik.handleChange}
              helperText={formik.touched.maNhom && formik.errors.maNhom}
              error={formik.touched.maNhom && Boolean(formik.errors.maNhom)}
            />
            <TextField
              label="Luot Xem"
              id="luotXem"
              name="luotXem"
              variant="outlined"
              fullWidth
              className={classes.inputText}
              value={formik.values.luotXem}
              onChange={formik.handleChange}
              helperText={formik.touched.luotXem && formik.errors.luotXem}
              error={formik.touched.luotXem && Boolean(formik.errors.luotXem)}
            />
            <TextField
              label="Danh Gia"
              id="danhGia"
              name="danhGia"
              variant="outlined"
              fullWidth
              className={classes.inputText}
              value={formik.values.danhGia}
              onChange={formik.handleChange}
              helperText={formik.touched.danhGia && formik.errors.danhGia}
              error={formik.touched.danhGia && Boolean(formik.errors.danhGia)}
            />
            <TextField
              label="Tai Khoan Nguoi Tao"
              id="taiKhoanNguoiTao"
              name="taiKhoanNguoiTao"
              variant="outlined"
              fullWidth
              className={classes.inputText}
              value={formik.values.taiKhoanNguoiTao}
              onChange={formik.handleChange}
              helperText={
                formik.touched.taiKhoanNguoiTao &&
                formik.errors.taiKhoanNguoiTao
              }
              error={
                formik.touched.taiKhoanNguoiTao &&
                Boolean(formik.errors.taiKhoanNguoiTao)
              }
            />
            <TextField
              id="ngayTao"
              label="Ngay Tao"
              name="ngayTao"
              variant="outlined"
              fullWidth
              value={formik.values.ngayTao}
              className={classes.inputText}
              onChange={formik.handleChange}
              error={formik.touched.ngayTao && Boolean(formik.errors.ngayTao)}
              helperText={formik.touched.ngayTao && formik.errors.ngayTao}
            />
            <TextField
              label="Ma Danh Muc"
              id="maDanhMuc"
              name="maDanhMucKhoaHoc"
              select
              variant="outlined"
              fullWidth
              className={classes.inputText}
              value={formik.values.maDanhMucKhoaHoc}
              onChange={formik.handleChange}
              helperText={
                formik.touched.maDanhMucKhoaHoc &&
                formik.errors.maDanhMucKhoaHoc
              }
              error={
                formik.touched.maDanhMucKhoaHoc &&
                Boolean(formik.errors.maDanhMucKhoaHoc)
              }
              defaultValue={formik.values.maDanhMucKhoaHoc}
            >
              {categoryList.map((option) => (
                <MenuItem key={option.maDanhMuc} value={option.maDanhMuc}>
                  {option.tenDanhMuc}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              variant="outlined"
              id="hinhAnh"
              name="hinhAnh"
              type="file"
              accept=".jpg, .png, .jpeg"
              className={classes.inputText}
              onChange={(event) => handleFileChange(event)}
              helperText={formik.touched.hinhAnh && formik.errors.hinhAnh}
              error={formik.touched.hinhAnh && Boolean(formik.errors.hinhAnh)}
            />
          </DialogContent>
          <div className={classes.actionButton}>
            <Button onClick={onClose} color="primary" variant="outlined">
              Disagree
            </Button>
            <ColorButton
              color="primary"
              type="submit"
              variant="outlined"
            >
              Agree
            </ColorButton>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
