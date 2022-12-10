import React from "react";
import styled from "styled-components";
import LayoutLogo from "../Assets/LayoutLogo.png";

const Layout = ({ children }) => {
  return (
    <Wrap>
      <LogoBox src={LayoutLogo} alt={"로고"} />
      <Container>{children}</Container>
    </Wrap>
  );
};

export default Layout;

const Wrap = styled.div`
  overflow-x: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: var(--black);
  z-index: -1;
  &.logo {
    position: absolute;
    border: 2px solid white;
  }
`;

const LogoBox = styled.img`
  @media only screen and (min-width: 1200px) {
    display: block;
    position: absolute;
    width: 20%;
    /* border: 2px solid white; */
    left: 13%;
    top: 35%;
    /* background-image: url(../Assets/LogoLayout.png); */
  }
  display: none;
`;

const Container = styled.div`
  z-index: 999;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  max-width: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 2px solid var(--primary);
  border-right: 2px solid var(--primary);
  @media only screen and (min-width: 1200px) {
    margin-left: 25%;
  }
`;
