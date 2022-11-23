import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Wrap>
      <Container>{children}</Container>
    </Wrap>
  );
};

export default Layout;

const Wrap = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: black;
  z-index: -1;
`;

const Container = styled.div`
  margin: 0;
  width: 100vw;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
