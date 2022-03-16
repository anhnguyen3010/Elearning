import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, StyledForm, TextButton, ButtonLogo, Logo, } from "src/styles";
import {
  SearchOutlined,
  MenuOutlined,
  RightOutlined,
  UserOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "src/actions/auth";
import { getCategory } from "src/actions/category";
import logo from "src/images/logo-coral.svg";
import { Link } from "react-router-dom";
import { getCourses } from "src/actions/courses";
import { StyledGrow, StyledMenuList, StyledPopper } from "src/styles/customize";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const HeaderSection = styled.header`
  display: flex;
  font-size: 1.4rem;
  position: relative;
  z-index: 999;
  padding: 0 1.6rem;
  height: 7.2rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);

  @media screen and (max-width: 800px) {
    display: block;
  }

  img {
    max-width: 100%;
    height: 3.2rem;
    width: 11rem;
    &.ude-logo {
      @media screen and (max-width: 800px) {
        flex: 1;
      }
    }
  }
`;

const Mobile = styled.div`
  display: none;
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu-toggle {
    position:relative;
    padding: 0 1.2rem;
    cursor: pointer;
  }
  .logo-mobile {
    flex: 1;
  }
  span {
    font-size: 2rem;
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  z-index: 1;
  width: 100%;
  @media screen and (max-width: 800px) {
    display: none;
  }

  .category{
    @media screen and (max-width: 800px) {
      display: none;
    }
    &:hover {
      .dropdown {
        display: block;
        transition: all 0.2s ease;
        animation: 0.5s cubic-bezier(0.2, 0, 0.38, 0.9) forwards;
      }
    }
  }

  .ude-business{
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }

  .ude-teach{
    @media screen and (max-width: 920px) {
      display: none;
    }
  }
  .ude-user {
    color: #73726c;
    font-size: 1.6rem;
    &:hover{
      .dropdown{
          display:block;
      }
    }
  }
`;

const SearchForm = styled.div`
  position: relative;
  max-width: none;
  display: flex;
  flex-grow: 1;
  height: 4.8rem;
  border: 1px solid #989586;
  border-radius: 9999px;
  background-color: #fbfbf8;
  margin: 0 1.2rem;
`;

const DropdownList = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: ${({ left }) => (left ? "8%" : "unset")};
  right: ${({ right }) => (right ? "5%" : "unset")};
  opacity: 1;
  transition: .25s;
  .wrapper {
    min-height: ${({ left }) => (left ? "40rem" : "16rem")};
    width: ${({ left }) => (left ? "26rem" : "13rem")};
    margin-top: 0.4rem;
    position: relative;
    background: #fff;
    border: 1px solid #dcdacb;
    border-radius: 0.4rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 8%), 0 4px 12px rgba(0, 0, 0, 8%);
    z-index: 1;

    li {
      padding: 1rem 0;
      height: auto;
      a {
        color:#868282;
        display: flex;
        justify-content: space-between;
        font-size: 1.4rem;
        padding: 0.8rem 1.6rem;
        &:hover{
          color:#0f7c90;
        }
      }
    }
    
  }
`;
const DropdownSearch = styled.div`
  display: block;
  position: absolute;
  top:105%;
  left: 5%;
  border-color:transparent;
  background: #fff;
  height: 20rem;
  overflow: hidden;
  overflow-y: scroll;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 8%), 0 4px 12px rgba(0, 0, 0, 8%);
  .wrapper {
    padding: 1rem;
    width: 50rem;
    li {
      padding: 1rem 0;
      height: auto;
      a {
        display: flex;
        justify-content: space-between;
        font-size: 1.4rem;
        padding: 0.8rem 1.6rem;
      }
    }
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);
  const { category } = useSelector((state) => state.category);
  const [keyword, setKeyword] = useState("");
  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const anchorRef = useRef(null);
  const modalRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleModal = () => {
    setModal((prevOpenModal) => !prevOpenModal);
  };

  const handleCloseModal = (event) => {
    if (modalRef.current && modalRef.current.contains(event.target)) {
      return;
    }
    setModal(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const prevOpenModal = useRef(modal);
  useEffect(() => {
    if (prevOpenModal.current === true && modal === false) {
      modalRef.current.focus();
    }
    prevOpenModal.current = modal;
  }, [modal]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const filtered = courses.filter((item) => {
    if (keyword === "") {
      return item;
    } else if (item.tenKhoaHoc.toLowerCase().includes(keyword.toLowerCase())) {
      return item;
    }
  });

  const renderDropdownSearch = filtered.map((item) => {
    return (
      <li key={item.maKhoahoc} onClick={handleCloseModal}>
        <Link to={`/course/${item.maKhoaHoc}`}>
          {item.tenKhoaHoc}
        </Link>
      </li>
    );
  })

  const renderCategoryList = category.map((item) => (
    <li key={item.maDanhMuc} onClick={handleClose}>
      <Link to={`/courses/${item.maDanhMuc}`}>
        {item.tenDanhMuc}
        <RightOutlined />
      </Link>

    </li>
  ))

  const handleAccess = () => (
    userInfo ?
      <>
        <div className="ude-user">
          <TextButton to="/user/public-profile">
            <p><UserOutlined /> Hi, <i>{userInfo.hoTen}</i></p>
          </TextButton>
          <DropdownList right className="dropdown">
            <div className="wrapper">
              <ul>
                <li>
                  <Link to="/user/public-profile">Public profile</Link>
                </li>
                <li>
                  <Link to="/user/edit-profile">Edit profile</Link>
                </li>
                <li>
                  <Link to="/user/course-enroll">My learning</Link>
                </li>
              </ul>
            </div>
          </DropdownList>
        </div>
        <Button className="authen" primary bd colorHover to="/" onClick={function (event) { handleLogout(); handleClose(event); }}>Logout</Button>
      </> :
      <>
        <Button onClick={handleClose} primary bd colorHover to="/login">Log in</Button>
        <Button onClick={handleClose} color to="/signup"> Sign up</Button>
      </>
  )

  return (
    <>
      <HeaderSection>
        <Mobile>
          <div className="menu-toggle" ref={anchorRef} onClick={handleToggle}>
            <MenuOutlined />
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
              <StyledPopper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <StyledGrow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <StyledMenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <div className="mobile">
                            {renderCategoryList}
                            {handleAccess()}
                          </div>
                        </StyledMenuList>
                      </ClickAwayListener>
                    </Paper>
                  </StyledGrow>
                )}
              </StyledPopper>
            </Backdrop>
          </div>

          <ButtonLogo to="/" className="logo-mobile">
            <Logo src={logo} alt="ude-logo" className="ude-logo" />
          </ButtonLogo>
          <TextButton className="search-toggle" ref={modalRef} onClick={handleModal}>
            <SearchOutlined />
            <div open={modal} onClick={handleCloseModal}>
              <StyledPopper open={modal} anchorEl={modalRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <StyledGrow search
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseModal}>


                        <StyledMenuList autoFocusItem={modal} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <div className="search-page">
                            <SearchOutlined />
                            <input
                              type="text"
                              placeholder="Search for anything"
                              value={keyword}
                              onChange={handleChange}
                              onClick={handleModal}
                            />
                            <CloseOutlined onClick={handleCloseModal} />
                          </div>
                          <ul>
                            {renderDropdownSearch}
                          </ul>
                        </StyledMenuList>

                      </ClickAwayListener>
                    </Paper>
                  </StyledGrow>
                )}
              </StyledPopper>
            </div>
          </TextButton>
        </Mobile>
        <Navbar>
          <ButtonLogo to="/">
            <Logo src={logo} alt="ude-logo" className="ude-logo" />
          </ButtonLogo>
          <div className="category">
            <TextButton to="/courses">
              <span>Categories</span>
            </TextButton>
            <DropdownList left className="dropdown">
              <div className="wrapper">
                <ul>
                  {renderCategoryList}
                </ul>
              </div>
            </DropdownList>
          </div>
          <SearchForm>
            <StyledForm>
              <TextButton>
                <SearchOutlined />
              </TextButton>
              <div className="search-page" >
                <input
                  type="text"
                  placeholder="Search for anything"
                  value={keyword}
                  onChange={handleChange}
                  onClick={handleFocus}
                />
                {focus ? <DropdownSearch onMouseLeave={handleBlur}>
                  <div className="wrapper" >
                    <ul>{renderDropdownSearch}</ul>
                  </div>
                </DropdownSearch> : null}
              </div>

            </StyledForm>
          </SearchForm>
          <div className="ude-business">
            <TextButton to="/">
              <span>Udemy for Business</span>
            </TextButton>
          </div>
          <div className="ude-teach">
            <TextButton to="/">
              <span>Teach on Udemy</span>
            </TextButton>
          </div>
          {handleAccess()}
        </Navbar>
      </HeaderSection>
    </>
  );
};

export default Header;
