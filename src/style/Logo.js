import React from "react";
import styled from "styled-components";

const Logo = () => {
  return <LogoCtn>로고가 들어갑니다</LogoCtn>;
};

const LogoCtn = styled.div`
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Logo;
