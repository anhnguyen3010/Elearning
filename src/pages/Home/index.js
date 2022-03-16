import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "src/actions/courses";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import {
  TextButton,
  StyledForm,
  StyledMain,
  Card,
  ButtonRed,
  CoursesSection,
} from "src/styles/";

import img from "src/images/8a5d045c-2dd2-4a4d-bb0e-a487af8a5aa0.jpg";

const Billboard = styled.section`
  margin: 0 auto 6.4rem;
  position: relative;
  width: 100%;
  display: block;
  img {
    position:relative;
    width: 100%;
    max-width: 100%;
    height: auto;
  }
  @media screen and (max-width: 700px) {
    margin-bottom: 0;
  }
  @media screen and (max-width: 550px) {
    margin-bottom: 5rem;
  }
  
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  justify-content:space-between;
  position: absolute;
  background: #fff;
  flex-direction: column;
  padding: 2.4rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  top: 6.4rem;
  left: 4.8rem;
  max-width: 44rem;
  @media screen and (max-width: 1200px) {
    top: 2.4rem;
    left: 2.4rem;
    width: 34rem;
  }
  @media screen and (max-width: 875px) {
    height: 16rem;
    padding:1rem 2rem;
  }
  @media screen and (max-width: 700px) {
    box-shadow: none;
    position: static;
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }

  h1 {
    font-weight: 700;
    font-size: 4rem;
    margin-bottom: 0.8rem;
    @media screen and (max-width: 900px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.9rem;
    margin-bottom: 1.6rem;

    @media screen and (max-width: 1200px) {
      font-size: 1.4rem;
    }
  }
  a {
    margin: 0;
    padding: 0;
  }
  span {
    padding: 0 1.2rem;
    font-size: 2rem;
  }
  .wrapper {
    border: 1px solid #989586;
    border-radius: 0.4rem;
  }
`;

const Headline = styled.div`
  margin-bottom: 2rem;
  h1 {
    font-size: 2.4rem;
    font-weight: 700;
  }
  p {
    font-size: 1.6rem;
    margin-top: 0.8rem;
  }
`;


export default function Home() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getCourses());
  }, []);


  const handleListCourses = () => {
    const list = [];
    const length = 8;
    try {
      for (let item = 0; item < length; item++) {
        let object = courses[item];
        list.push(
          <Card key={object.maKhoaHoc}>
            <Link to={`/course/${object.maKhoaHoc}`}>
              <div className="card-img">
                <img src={object.hinhAnh} alt="khoaHoc" />
              </div>
              <div className="card-content">
                <h3>{object.tenKhoaHoc}</h3>
                <p>{object.moTa}</p>
              </div>
              <div className="card-action">
                <ButtonRed>View</ButtonRed>
              </div>
            </Link>
          </Card>
        )
      } return (<div className="inner">{list}</div>)
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <StyledMain>
      <Billboard>
        <img src={img} alt="img-billboard" />
        <Box>
          <h1>Dream up</h1>
          <p>
            Ambition accepted. Learn the latest skills to reach your
            professional goals.
          </p>
          <div className="wrapper">
            <StyledForm>
              <input type="text" placeholder="What do you want to learn?" />
              <TextButton to="/">
                <SearchOutlined />
              </TextButton>
            </StyledForm>
          </div>
        </Box>
      </Billboard>
      <Headline>
        <h1>The world's largest selection of courses</h1>
        <p>
          Choose from 130,000 online video courses with new additions published
          every month
        </p>
      </Headline>
      <CoursesSection>
        {handleListCourses()}
      </CoursesSection>
    </StyledMain>
  );
}
