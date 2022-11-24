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
  overflow-x: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: var(--black);
  z-index: -1;
`;

const Container = styled.div`
  margin: 0;
  overflow-x: hidden;
  width: 100vw;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
