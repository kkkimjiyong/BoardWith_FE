import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderCtn>헤더</HeaderCtn>;
};

const HeaderCtn = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 70px;
  background-color: #9747ff;
`;

export default Header;
