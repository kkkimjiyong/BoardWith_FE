import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <Wrap>
        <Container>{children}</Container>
      </Wrap>
    </>
  );
};

export default Layout;

const Wrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: black; */
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 640px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
