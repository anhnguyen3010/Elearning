import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountInfo } from "src/actions/user";
import { ButtonRed, Alert } from "src/styles";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";

//create schema validation
const schema = yup.object().shape({
  matKhau: yup
    .string()
    .required("Password is required")
    .min(5, "Password must have 5 to 20 characters")
    .max(20, "Password must have 5 to 20 characters"),
  soDt: yup.string().notRequired(),
  hoTen: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
});

const UserForm = styled.form`
  .form-wrapper {
    padding: 2rem 10rem;
    .disabled {
      display: none !important;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      input {
        display: block;
        width: 100%;
        height: 4.5rem;
        padding: 1rem 1.2rem;
        font-size: 1.6rem;
        line-height: 1.43;
        color: #29303b;
        background-color: #fff;
        background-image: none;
        border: 1px solid #8a92a3;
        border-radius: 2px;
        box-shadow: none;
        transition: border-color ease-in-out 0.08s, box-shadow ease-in-out 0.08s;
      }
      input:disabled {
        background: #8a92a3;
      }
    }
    label {
      padding: 1rem 0;
    }
    @media screen and (max-width: 1200px) {
      padding: 2rem 5rem;
    }
    @media screen and (max-width: 800px) {
      padding: 2rem;
    }
  }
  .action-form {
    box-shadow: 0 1px 0 0 #fff, 0 -1px 0 0 #dedfe0;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    button {
      margin-top: 1rem;
    }
  }
`;

export default function EditProfile() {
  const dispatch = useDispatch();
  const { account, error } = useSelector((state) => state.user);

  const [userUpdate, setUserUpdate] = useState(account);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  let handleUpdate = () => {
    dispatch(updateAccountInfo(userUpdate));
    setUserUpdate((userUpdate) => ({ ...userUpdate, hoTen: userUpdate.hoTen }));
    alert("Update successfully!");
  };

  let result = [userUpdate].flat();

  return (
    <UserForm onSubmit={handleSubmit(handleUpdate)}>
      <div className="form-wrapper">
        {result.map((item) => (
          <div key={item.taiKhoan}>
            <div className="form-group">
              <label>Account</label>
              <input
                type="text"
                disabled
                placeholder="Username"
                defaultValue={item.taiKhoan}
                {...register("taiKhoan")}
              />
            </div>
            {errors.taiKhoan && (
              <Alert style={{ color: "#ec5252" }}>
                {errors.taiKhoan.message}
              </Alert>
            )}

            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                disabled
                placeholder="Password"
                defaultValue={item.matKhau}
                {...register("matKhau")}
              />
            </div>
            {errors.matKhau && <Alert>{errors.matKhau.message}</Alert>}

            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Full name"
                defaultValue={item.hoTen}
                {...register("hoTen")}
              />
            </div>
            {errors.hoTen && <Alert>{errors.hoTen.message}</Alert>}
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="text"
                placeholder="Phone number"
                defaultValue={item.soDT}
                {...register("soDT")}
              />
            </div>
            {errors.soDT && <Alert>{errors.soDT.message}</Alert>}
            <div className="form-group disabled">
              <input
                name="maLoaiNguoiDung"
                type="text"
                {...register("maLoaiNguoiDung")}
                defaultValue={item.maLoaiNguoiDung}
              />
            </div>
            <div className="form-group">
              <label>Group ID</label>
              <input
                name="maNhom"
                type="text"
                {...register("maNhom")}
                defaultValue={item.maNhom}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                defaultValue={item.email}
                placeholder="Email"
                {...register("email")}
              />
            </div>
            {errors.email && <Alert>{errors.email.message}</Alert>}
            {error && <Alert style={{ color: "#ec5252" }}>{error}</Alert>}
          </div>
        ))}
      </div>

      <ButtonRed type="submit">Save</ButtonRed>
    </UserForm>
  );
}
