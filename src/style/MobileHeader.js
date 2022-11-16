import React from "react";
import styled from "styled-components";

const MobileHeader = () => {
  return (
    <MobileHeaderCtn>
      <div>로그인</div>
      <div>메인으로가기</div>
      <div>마이페이지</div>
      모바일용 헤더
    </MobileHeaderCtn>
  );
};

const MobileHeaderCtn = styled.div`
  @media only screen and (max-width: 428px) {
    position: fixed;
    bottom: 0px;
    height: 5%;
    background-color: #9747ff;
  }
  position: absolute;
  width: 100%;
  height: 60px;
  /* background-color: #9747ff; */
  border: 2px solid black;
`;

export default MobileHeader;
