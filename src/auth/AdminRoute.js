import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children, ...props }) {
  const { userInfo } = useSelector((state) => state.auth);
  //Not login
  if (!userInfo) {
    return <Redirect to={`/login?redirectTo=${props.path}`} />;
  }

  //Login but not admin role
  if (userInfo.maLoaiNguoiDung !== "GV") {
    return <Redirect to="/" />;
  }
  return <Route {...props}>{children}</Route>;
}
