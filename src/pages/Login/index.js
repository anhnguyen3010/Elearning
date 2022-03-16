import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router";
import qs from "qs";
import { login } from "src/actions/auth";

import { MailFilled, LockFilled } from "@ant-design/icons";
import {
  AuthForm,
  ActionForm,
  StyledLogin,
  StyledFooterLogin,
  Alert,
} from "src/styles";

//create schema validation
const schema = yup.object().shape({
  taiKhoan: yup
    .string()
    .required("Username is required")
    .min(5, "Username must have 5 to 20 characters")
    .max(20, "Username must have 5 to 20 characters"),
  matKhau: yup
    .string()
    .required("Password is required")
    .min(5, "Password must have 5 to 20 characters")
    .max(20, "Password must have 5 to 20 characters"),
});

export default function Login({ children }) {
  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.auth);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    // console.log(inpUsername.current.values)
    // console.log(data);

    //dispatch action login
    dispatch(login(data));
  };

  if (userInfo) {
    const { redirectTo } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    if (location.state) {
      return <Redirect to={location.state.prevPath} />
    }
    return <Redirect to="/" />;
  }

  return (
    <StyledLogin>
      <div className="title">Log In to Your Udemy Account!</div>
      <div className="content">
        <AuthForm onSubmit={handleSubmit(handleLogin)}>
          <div className="form-field-container">
            <MailFilled />
            <input
              type="text"
              placeholder="Username"
              {...register("taiKhoan")}
            />
          </div>
          {errors.taiKhoan && (
            <Alert style={{ color: "#ec5252" }}>
              {errors.taiKhoan.message}
            </Alert>
          )}
          <div className="form-field-container">
            <LockFilled />
            <Controller
              name="matKhau"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 5,
                  message: "Password must have 5 to 20 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must have 5 to 20 characters",
                },
              }}
              render={({ field }) => {
                return (
                  <input type="password" placeholder="Password" {...field} />
                );
              }}
            />
          </div>
          {errors.matKhau && (
            <Alert style={{ color: "#ec5252" }}>{errors.matKhau.message}</Alert>
          )}
          {error && <Alert style={{ color: "#ec5252" }}>{error}</Alert>}

          <ActionForm>
            <div className="btn-submit">
              <button
                type="submit"
                handleLogin

              >
                Log In
              </button>
              <span>or</span>
              <Link to="/">Forgot Password</Link>
            </div>
          </ActionForm>
        </AuthForm>
        <StyledFooterLogin>
          <div>
            Don't have an account?
            <Link to="/signup">Sign up</Link>
          </div>
        </StyledFooterLogin>
      </div>
    </StyledLogin>
  );
}
