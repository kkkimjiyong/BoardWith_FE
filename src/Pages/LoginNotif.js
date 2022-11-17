import React from "react";
import styled from "styled-components";

const LoginNotif = () => {
  return (
    <Wrapper>
      <div>로그인이 필요합니다!</div>
      <div>로그인</div>
      <div>회원가입</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
`;

export default LoginNotif;
