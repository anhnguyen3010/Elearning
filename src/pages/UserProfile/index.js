import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAccountInfo } from "src/actions/user";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const UserSection = styled.section`
  margin: 0 auto;
  padding: 0 1.5rem;
  min-width: 32rem;
  width: 117rem;
  
  @media screen and (max-width: 992px) {
    width: 75rem;
  }
  @media screen and (max-width: 768px) {
    width: 60rem;
  }
  @media screen and (max-width: 600px) {
    width: 50rem;
  }
  @media screen and (max-width: 500px) {
    width: 40rem;
  }
  @media screen and (max-width: 400px) {
    width: 25rem;
  }
`;

const Container = styled.div`
  margin: 2rem auto 4rem;
  max-width: 110rem;
`;

const LargeScreen = styled.div`
  position: relative;
  padding-left: 20rem;
  @media screen and (max-width:768px){
    display:none;
  }
`;

const MenuSideBar = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  position: absolute;
  width: 20rem;
  box-shadow: 1px 1px #dedfe0 inset, 0 -1px #dedfe0 inset;
  overflow: hidden;
  padding-bottom: 20px;
`;

const List = styled.ul`
  margin:2rem 0 3rem;
    li {
      position:relative;
      font-size:1.5rem;
      a{
        padding: 1rem;
        display:block;
        width:100%;
        &:hover{
          color:#fff;
          background: #b9b2b0;
        }
        
        &:after{
          content: '';
          position:absolute;
          left:0;
          top:0;
          display: block;
          width:0;
          height:0;
          background: #b9b2b0;
        }
      }
    }

`

const MobileScreen = styled.div`
  display:none;
  @media screen and (max-width:768px){
    display:block;
  }
`

const Public = styled.div`
  padding: 1rem;
  text-align: center;
  .wrapper {
    border: 1px solid #b9b2b0;
    border-radius: 50%;
    font-size: 3rem;
    margin: auto;
    color: #524a47;
    width: 13rem;
    height: 13rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .userName {
    margin-top: 3rem;
    font-size: 2.4rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    h1{
      color:#969696;
    }
  }
`;

const Article = styled.div`
  background: #fff;
  position: relative;
  min-height: 60rem;
  border: 1px solid #dedfe0;
  h2 {
    color: #29303b;
    text-align: center;
    line-height: 1 !important;
    font-weight: 700 !important;
    font-size: 2.2rem;
    margin: 2rem 0 0.3rem;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    color: #29303b;
    text-align: center;
    margin: 0 0 1.5rem;
    line-height: 2.5rem;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #29303b;
    padding: 1.5rem;
    span {
      font-weight: normal;
      padding-left: 1.5rem;
    }
  }
`;

const FormContainer = styled.div`
  box-shadow: 0 1px 0 0 #dedfe0, 0 -1px 0 0 #dedfe0;
`;

export default function UserProfile({ children }) {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.user);

  useEffect(() => {
    const account = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (account) {
      dispatch(getAccountInfo(account));
    }
  }, []);

  let result = [account].flat();

  const renderScreen = result.map(item => (
    <>
      <Public>
        <div className="wrapper">
          <UserOutlined />
        </div>
        <div className="userName">
          <h1>{item.hoTen}</h1>
        </div>
      </Public>
      <List>
        <li>
          <Link class="active" to="/user/public-profile">Public profile</Link>
        </li>
        <li>
          <Link to="/user/edit-profile">Edit profile</Link>
        </li>
        <li>
          <Link to="/user/course-enroll">Course enroll</Link>
        </li>
      </List>
    </>
  ))

  const renderArticle = () => (
    <Article>
      <h2>Public profile</h2>
      <h3>Add information about yourself</h3>
      <FormContainer>{children}</FormContainer>
    </Article>
  )


  return (
    <UserSection>
      <Container>
        <MobileScreen>
          {renderScreen}
          {renderArticle()}
        </MobileScreen>
        <LargeScreen>
          <MenuSideBar>
            {renderScreen}
          </MenuSideBar>
          {renderArticle()}
        </LargeScreen>
      </Container>
    </UserSection>
  );
}
