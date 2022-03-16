import React from "react";
import * as LottiePlayer from "@lottiefiles/lottie-player";


import styled from "styled-components";
import { ButtonRed } from "src/styles";
import { Link } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  background: #fbfbf8;
  height: 70rem;
  max-width: 100%;
  text-align: center;
  flex-direction: column;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  .content {
    margin-bottom: 1rem;
    h1 {
      font-size: 7.2rem;
      font-weight: 700;
    }
    p {
      font-size: 4.2rem;
      padding:1.3rem;
    }
  }
`;

function PageNotFound() {
  return (
    <Container>
       <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://assets4.lottiefiles.com/private_files/lf30_fi8yfbmc.json"
            style={{ width: "90vw", height: "50vh"}}
          ></lottie-player>
      <div className="content">
        {/* <h1>404 Page Not Found!</h1> */}
        <p>Oops! Looks like something went wrong.</p>
      </div>
      <ButtonRed>
        <Link to="/" style={{ color: "#fff" }}>
          Back to Homepage
        </Link>
      </ButtonRed>
    </Container>
  );
}

export default PageNotFound;
