import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo } from "src/actions/user";

export default function PublicProfile() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.user);

  useEffect(() => {
    const account = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (account) {
      // console.log(account);
      dispatch(getAccountInfo(account));
    }
  }, [account]);

  let result = [account].flat();
  return (
    <div style={{padding:'2rem'}}>
      {result.map((item) => (
        <>
          <h4>
            Account: <span>{item.taiKhoan}</span>
          </h4>
          <h4>
            Full name: <span>{item.hoTen}</span>
          </h4>
          <h4>
            Phone number: <span>{item.soDT}</span>
          </h4>
          <h4>
            Email: <span>{item.email}</span>
          </h4>
          <h4>
            Group ID: <span>{item.maNhom}</span>
          </h4>
         
        </>
      ))}
    </div>
  );
}
