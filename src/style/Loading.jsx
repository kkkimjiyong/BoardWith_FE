import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <StContainer>
      <StModal>
        <LoadingText>잠시만 기다려 주세요.</LoadingText>
        <FontAwesomeIcon
          style={{
            color: "white",
          }}
          size="2x"
          icon={faSpinner}
          spin
        />
      </StModal>
    </StContainer>
  );
};
export default Loading;

const StContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #0000009c;
  z-index: 999;
  position: fixed;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
`;

const StModal = styled.div`
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  z-index: 42;
`;
const LoadingText = styled.div`
  color: white;
  text-align: center;
`;
