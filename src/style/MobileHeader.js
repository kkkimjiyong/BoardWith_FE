import React from "react";
import styled from "styled-components";

const MobileHeader = () => {
  return <MobileHeaderCtn>모바일용 헤더</MobileHeaderCtn>;
};

const MobileHeaderCtn = styled.div`
  @media only screen and (max-width: 428px) {
    position: fixed;
    bottom: 0px;
  }

  width: 100%;
  height: 30px;
  background-color: #9747ff;
  border: none;
`;

export default MobileHeader;
