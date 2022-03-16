import styled from "styled-components";
import { Link } from "react-router-dom";

//============FORM===============

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;

  .search-page{
    width:100%;
  }

  input {
    display: block;
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 1.6rem;
  }
  span {
    font-size: 2rem;
  }
`;

export const Logo = styled.img`
  max-width: 100%;
  height: 3.2rem;
  width: 11rem;
  &.imgCenter {
    @media screen and (max-width: 800px) {
      flex: 1;
    }
  }
`;

export const ButtonLogo = styled(Link)`
  justify-content: center;
  cursor: pointer;
  padding-right: 1.2rem;
  display: flex;
`;

export const Button = styled(Link)`
  margin-left: 0.8rem;
  border-radius: 0.4rem;
  background: ${({ primary }) => (primary ? "#fff" : "#0f7c90")};
  border: 1px solid ${({ bd }) => (bd ? "#0f7c90" : "#fff")};
  white-space: nowrap;
  padding: 0 1.2rem;
  color: ${({ color }) => (color ? "#fff" : "#0f7c90")};
  font-size: 1.4rem;
  outline: none;
  min-width: 10rem;
  height: 4rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ primary }) => (primary ? "#fff" : "#094c59")};
    color: ${({ colorHover }) => (colorHover ? "#094c59" : "#fff")};
  }
  @media screen and (max-width: 800px) {
    display:block;
    border:none;
    height:100%;
    padding: 1rem 0;
    background-color:#fff;
    color: #0f7c90;
  }
`;

export const ButtonRed = styled.button`
  position: relative;
  align-items: center;
  border-radius: 4px;
  border: none;
  display: flex;
  min-width: 10rem;
  padding: 0 1.2rem;
  justify-content: center;
  user-select: none;
  vertical-align: bottom;
  white-space: nowrap;
  height: 4.8rem;
  font-weight: 600;
  color: #fff;
  background: #ec5252;
  &:hover {
    background: #e61b1b;
  }
  @media screen and (max-width: 600px) {
    min-width: 7rem;
    height:4rem;
    font-size:1.3rem;
  }
`;

export const TextButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  align-self: center;
  padding: 0 1.2rem;
  margin: 1.2rem 0;
  user-select: none;
  vertical-align: bottom;
  white-space: nowrap;
  min-width: auto;
  height: 4.8rem;

  &:hover {
    color: #0f7c90;
  }
`;

export const Card = styled.div`
  width: 100%;
  flex-direction: column;
  max-width: 37.5rem;
  min-width: 17.3rem;
  border-radius: 0.3rem;
  border-bottom: 1px solid #dcdacb;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  .card-img {
    position: relative;
    width: 100%;
    height: 17rem;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover{
      &:before{
      content:"";
      background:#1e1e1c;
      position:absolute;
      top:0;
      left:0;
      height:100%;
      width:100%;
      opacity:0.2;
      }
    }
    @media screen and (max-width: 1024px){
      height: 14rem;
    }
  }

  .card-content {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 1.4rem;
    height:10rem;
    width: 100%;
    h3 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 1.6rem;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }
    p {
      color: #73726c;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &:hover{
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 2px 4px 12px rgb(0 0 0 / 12%);
  }
  .card-action{
    padding: 0 1.4rem 1.4rem;
  }
`;

export const AuthForm = styled.form`
  .form-field-container {
    border: 1px solid #8a92a3;
    margin-bottom: 0.8rem;
    position: relative;
    padding: 1.1rem 4.5rem 1.2rem 1rem;
    border-radius: 0.4rem;
    color: #cacbcc;
    span {
      font-size: 1.6rem;
      margin-right: 1rem;
    }
    input {
      font-weight: 400;
      font-size: 1.8rem;
      border: none;
    }
  }
  .disabled{
    display:none;
  }
  .select {
    padding: 0;
  }
`;

export const ActionForm = styled.div`
  margin-bottom: 1.6rem;
  text-align: center;
  .btn-submit > button {
    width: 100%;
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
    height: 4.8rem;
    background: #ec5252;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.3rem;
    margin-bottom: 1.6rem;
    &:hover {
      background: #992337;
      border-color: transparent;
    }
  }
  span {
    font-size: 1.5rem;
    margin-right: 0.3rem;
  }
  a {
    font-size: 1.5rem;
    &:hover {
      color: #003845;
    }
  }
`;

export const StyledLogin = styled.div`
  width: 38rem;
  margin: 2.4rem auto;
  .title {
    font-size: 1.6rem;
    font-weight: 700;
    padding: 2.4rem 6.4rem 2.4rem 2.4rem;
    border-bottom: solid 1px #dedfe0;
  }
  .content {
    padding: 2.4rem 2.4rem 1.6rem;
  }

  @media screen and (max-width: 375px){
    width:100%;
    .title{
      padding: 2rem;
      text-align:center;
    }
  }
`;

export const Alert = styled.div`
  margin: 0.8rem 0 0.8rem 0;
  padding: 1.6rem;
  background: #faebeb;
  color: #ec5252;
  border: 1px solid transparent;
  text-align: left;
`;

export const StyledFooterLogin = styled.div`
  text-align: center;
  font-size: 1.6rem;
  a {
    margin-left: 0.5rem;
    font-weight: 700;
  }
`;

export const StyledMain = styled.main`
  max-width: 134rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 2.4rem;
`;

export const CoursesSection = styled.section`
  width: 100%;
  margin: 4.2rem 0;
  .inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3.5rem;
    @media screen and (max-width: 980px) {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2.5rem;
      
    }
    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 2rem;
    }
    @media screen and (max-width: 425px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
