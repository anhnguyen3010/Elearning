import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "src/actions/courses";
import { Card, ButtonRed, CoursesSection, StyledMain } from "src/styles";
import { Link } from "react-router-dom";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";

const Courses = () => {

  const { courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  return (
    <StyledMain>
      <CoursesSection>
        <Breadcrumb/>
        <div className="content">
          <div className="inner">
            {courses.map((item) => (
              <Card key={item.maKhoaHoc}>
                <Link to={`/course/${item.maKhoaHoc}`}>
                  <div className="card-img">
                    <img src={item.hinhAnh} alt="khoaHoc" />
                  </div>
                  <div className="card-content">
                    <h3>{item.tenKhoaHoc}</h3>
                    <p>{item.moTa}</p>
                  </div>
                  <div className="card-action">
                    <ButtonRed>View</ButtonRed>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </CoursesSection>
    </StyledMain>
  )
}

export default Courses
