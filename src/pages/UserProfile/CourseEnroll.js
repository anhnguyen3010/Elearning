import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonRed } from "src/styles";
import { cancelCourse } from "src/actions/enroll";

const Wrapper = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dedfe0;
  input {
    display: none;
  }
`;

const Direct = styled(Link)`
  font-weight: 700;
  font-size: 2rem;
  @media screen and (max-width: 992px) {
    font-size:1.6rem;
  }
`;

const Title = styled.h2`
  padding: 2rem 0;
  font-size:2rem;
`;

export default function CourseEnroll() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.user);
  let [url, setUrl] = useState("");

  //convert course to new Array
  let result = [account].flat();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const handleCancel = (e) => {
    const notice = window.confirm("Are you want to cancel this course?");
    if (notice) {
      dispatch(cancelCourse({ maKhoaHoc: url, taiKhoan: userInfo.taiKhoan }));
      alert("Cancel course successfully");
    } else {
      e.preventDefault();
    }
  }


  return (
    <>
      <Title>Courses you're enrolled in</Title>
      {result.map((item) =>
        item.chiTietKhoaHocGhiDanh.map((enroll) => (
          <form onSubmit={handleCancel}>
            <Wrapper>
              <Direct to={`/course/${enroll.maKhoaHoc}`}>
                {enroll.tenKhoaHoc}
              </Direct>
              <ButtonRed type="submit" onClick={() => setUrl(enroll.maKhoaHoc)}>Cancel</ButtonRed>
            </Wrapper>
          </form>
        ))
      )}
    </>
  );
}
