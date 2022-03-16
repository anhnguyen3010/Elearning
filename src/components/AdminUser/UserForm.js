import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch} from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
//
import UserControl from '../UserControl/UserControl';
//
import {  updateUser, addUser, getUserList} from '../../actions/adminUser';


const useStyles = makeStyles({
  inputText:{
    padding:10,
  }
})
export default function UserForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userUpdate, setOpenModal, recordForEdit, setRecordForEdit, typeOfUser } = props;

  useEffect(() => {
  
  }, [recordForEdit]);

  const handleClose = () => {
    setRecordForEdit(null);
    setOpenModal(false);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: recordForEdit ? userUpdate.taiKhoan : '',
      matKhau: recordForEdit ? userUpdate.matKhau : '',
      hoTen: recordForEdit ? userUpdate.hoTen : '',
      soDt: recordForEdit ? userUpdate.soDt : '',
      maLoaiNguoiDung: recordForEdit ? userUpdate.maLoaiNguoiDung : 'HV',
      maNhom: recordForEdit ? userUpdate.maNhom : 'GP08',
      email: recordForEdit ? userUpdate.email : '',
    },
    validationSchema: Yup.object({
      taiKhoan: Yup
        .string()
        .required("This field is required.")
        .matches(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]*$/,"Invalid characters")
        .min(5, "Use from 5 to 20 characters for your account.")
        .max(20, "Use from 5 to 20 characters for your account."),
      matKhau: Yup.string().required("This field is required.")
      .min(5, "Use from 5 to 20 characters for your password.")
        .max(20, "Use from 5 to 20 characters for your password.")
      ,
      hoTen: Yup.string().required("This field is required."),
      email: Yup.string()
      .required("This field is required.")
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,"Email is not valid"),
      soDt: Yup.string()
      .min(9,"Phone is not valid")
      .max(11,"Phone is not valid")
      .matches(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/,"Phone is not valid"),
      maLoaiNguoiDung: Yup.string(),
    }),
    onReset: () => {
      console.log("reset")
    },
    onSubmit: async (values) => {
     
      try {
        if(!recordForEdit) {
          await dispatch(addUser(values))
        }
        if(recordForEdit) {
          await dispatch(updateUser(values))
        }
        await dispatch(getUserList());
        setRecordForEdit(false);
        setOpenModal(false);
      }
      catch (err) {
        setOpenModal(false)
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            fullWidth
            className={classes.inputText}
            variant="outlined"
            id="taiKhoan"
            name="taiKhoan"
            label="Account"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
            error={formik.touched.taiKhoan && Boolean(formik.errors.taiKhoan)}
            helperText={formik.touched.taiKhoan && formik.errors.taiKhoan}
          />
          <TextField
            fullWidth
            variant="outlined"
            className={classes.inputText}
            id="hoTen"
            name="hoTen"
            label="Name"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
            error={formik.touched.hoTen && Boolean(formik.errors.hoTen)}
            helperText={formik.touched.hoTen && formik.errors.hoTen}
          />
          <TextField
            fullWidth
            variant="outlined"
            className={classes.inputText}
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            className={classes.inputText}
            id="soDt"
            name="soDt"
            label="Phone"
            value={formik.values.soDt}
            onChange={formik.handleChange}
            error={formik.touched.soDt && Boolean(formik.errors.soDt)}
            helperText={formik.touched.soDt && formik.errors.soDt}
          />
           <TextField
            fullWidth
            variant="outlined"
            className={classes.inputText}
            id="matKhau"
            name="matKhau"
            label="Password"
            value={formik.values.matKhau}
            type="text"
            onChange={formik.handleChange}
            error={formik.touched.matKhau && Boolean(formik.errors.matKhau)}
            helperText={formik.touched.matKhau && formik.errors.matKhau}
          />
          <TextField
            fullWidth
            className={classes.inputText}
            variant="outlined"
            id="maLoaiNguoiDung"
            name="maLoaiNguoiDung"
            select
            label="Type Of User"
            value={formik.values.maLoaiNguoiDung}
            onChange={formik.handleChange}
            helperText={formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung}
            error={formik.touched.maLoaiNguoiDung && Boolean(formik.errors.maLoaiNguoiDung)}
            dafaultValue={formik.values.maLoaiNguoiDung}
          >
         
            {typeOfUser.map((option) => (
              <MenuItem key={option.maLoaiNguoiDung}
                value={option.maLoaiNguoiDung}

              >
                {option.tenLoaiNguoiDung}
              </MenuItem>
            ))}
          </TextField>

          <div>
            {recordForEdit ? <UserControl.ActionButton color="primary"
              onClick={handleClose}
            >Cancel</UserControl.ActionButton> : <UserControl.ActionButton color="primary"
              onClick={formik.handleReset}
            >Reset</UserControl.ActionButton>}
            <UserControl.ActionButton color="primary"
              type='submit'
              onPress={handleClose}
            >Submit</UserControl.ActionButton>
          </div>
        </Grid>
      </Grid>
    </form>)
}