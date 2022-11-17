import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <MobileHeaderCtn>
      <div onClick={() => navigate("/main")}>메인으로가기</div>
      <div onClick={() => navigate("/mypage")}>마이페이지</div>
    </MobileHeaderCtn>
  );
};

const MobileHeaderCtn = styled.div`
  position: fixed;
  z-index: 999;
  height: 5%;
  background-color: #9747ff;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  bottom: 0px;
  width: 100%;
  /* background-color: #9747ff; */
  border: 2px solid black;
`;

export default MobileHeader;
