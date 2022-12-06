import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { userApi } from "../instance";
import LayoutLogo from "../Assets/MainLogo.png";
import { useNavigate } from "react-router-dom";

const AlertModal = ({ content, setAlert, address }) => {
  const navigate = useNavigate();

  const buttonHandler = () => {
    setAlert(false);
    navigate(address);
  };

  return (
    <BackGroudModal>
      <Wrap>
        <CheckCtn>
          {/* <img src={LayoutLogo} className="logo" /> */}
          <div>Board With</div>
          <CheckBox>
            <div>{content}</div>{" "}
            <ContentBox className="Btn" onClick={() => buttonHandler()}>
              확인
            </ContentBox>
          </CheckBox>{" "}
          {/* <div className="btmTxt">누르면 메인페이지로 넘어갑니다.</div> */}
        </CheckCtn>
      </Wrap>
    </BackGroudModal>
  );
};

const BackGroudModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.4);
  /* position: fixed;
  left: 50%;
  top: 50vh;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  z-index: 42;
  display: block; */
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBox = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: var(--gray); */
`;

const CheckCtn = styled.div`
  color: var(--white);
  width: 80%;
  height: 30%;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 2% 5%;
  background-color: var(--gray);
  box-shadow: 1px 2px 10px 0px var(--primary);
  .btmTxt {
    font-size: 12px;
  }
  .logo {
    position: absolute;
    transform: scale(0.8);
  }
`;

const ContentBox = styled.div`
  color: white;
  position: absolute;
  bottom: 0%;
  margin: 0% 2.5%;
  width: 100%;
  height: 20%;
  border-radius: 10px;
  background-color: var(--primary);
  :hover {
    cursor: pointer;
  }
  &.Btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default AlertModal;
