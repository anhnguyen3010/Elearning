import React from "react";
import { Link } from "react-router-dom";
import { ButtonLogo, Logo } from "src/styles";
import logo from "src/images/logo-coral.svg";
import { GlobalOutlined, ArrowUpOutlined } from "@ant-design/icons";
import styled from "styled-components";

const FooterSection = styled.footer`
  border-top: 1px solid #dcdacb;
  padding: 2.4rem 4.8rem 0;

  @media screen and (max-width: 75rem) {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }
  @media screen and (max-width: 61.5rem) {
    padding: 2.4rem 2.4rem 0;
  }

  ul {
    flex-basis: 25rem;
    margin-right: 1.6rem;
  }

  .logo-footer {
    justify-content: flex-start;
  }
`;
const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 729px) {
    display: block;
    padding: 1rem 0;
  }
  &.bottom {
    justify-content: space-between;
    padding-bottom: 3rem;
    align-items: center;
    a{
      margin: 2rem 0; 
    }
  }
  li{
    display:block;
  }
`;

const Item = styled(Link)`
  text-transform: none;
  color:#0f7c90;
  display: block;
  padding: 0.4rem 0;
  font-size: 1.4rem;
  font-weight: 400;
  &:hover {
    color: #094c59;
  }
`;

const ButtonLang = styled.div`
  order: 1;
  margin-left: auto;
  width: 20rem;
  @media screen and (max-width: 45.5rem) {
    padding-top: 2rem;
    margin-left: 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #0f7c90;
    background-color: transparent;
    border: 1px solid #2896a9;
    height: 4.8rem;
    font-size: 1.6rem;
    font-weight: 700;
    width: 100%;
    padding: 1rem 1.2rem;
    border-radius: 0.4rem;

    span {
      font-size: 1.4rem;
    }
  }
`;

const Footer = () => {
  return (
    <FooterSection>
      <Wrapper>
        <ul>
          <li>
            <Item to="/">Udemy for Business</Item>
          </li>
          <li>
            <Item to="/">Teach on Udemy</Item>
          </li>
          <li>
            <Item to="/">Get the app</Item>
          </li>
          <li>
            <Item to="/">About us</Item>
          </li>
          <li>
            <Item to="/">Contact us</Item>
          </li>
        </ul>
        <ul>
          <li>
            <Item to="/">Careers</Item>
          </li>
          <li>
            <Item to="/">Blog</Item>
          </li>
          <li>
            <Item to="/">Help And Support</Item>
          </li>
          <li>
            <Item to="/">Affiliate</Item>
          </li>
        </ul>
        <ul>
          <li>
            <Item to="/">Terms</Item>
          </li>
          <li>
            <Item to="/">Privacy policy</Item>
          </li>
          <li>
            <Item to="/">Sitemap</Item>
          </li>
          <li>
            <Item to="/">Featured courses</Item>
          </li>
        </ul>
        <ButtonLang>
          <button>
            <GlobalOutlined />
            <span>English</span>
            <ArrowUpOutlined />
          </button>
        </ButtonLang>
      </Wrapper>
      <Wrapper className="bottom">
        <ButtonLogo to="/">
          <Logo src={logo} alt="ude-logo" className="logo-footer" />
        </ButtonLogo>
        <span>© 2021 Udemy, Inc.</span>
      </Wrapper>
    </FooterSection>
  );
};

export default Footer;
