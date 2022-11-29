import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { userApi } from "../instance";

const DailyCheck = ({ setSelfCheck, selfCheck }) => {
  const checkHandler = () => {
    setSelfCheck(false);
  };

  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);
    } catch (error) {}
  };

  // const dailyCheck

  useEffect(() => {
    getUser();
  }, []);

  console.log(selfCheck);

  return (
    <BackGroudModal>
      <Wrap>
        <CheckCtn>
          <div>출석체크 보드윗</div>
          <CheckBox>
            <ContentBox>Day1</ContentBox>
            <ContentBox>Day2</ContentBox>
            <ContentBox>Day3</ContentBox>
            <ContentBox>Day4</ContentBox>
            <ContentBox>Day5</ContentBox>
            <ContentBox>Day6</ContentBox>
            <ContentBox>Day7</ContentBox>
            <ContentBox className="Btn" onClick={checkHandler}>
              출석체크
            </ContentBox>
          </CheckBox>
          누르면 메인페이지로 넘어갑니다.
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBox = styled.div`
  width: 90%;
  height: 80%;
  border-radius: 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* background-color: var(--gray); */
`;

const CheckCtn = styled.div`
  width: 90%;
  height: 45%;
  border-radius: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0% 5%;
  background-color: var(--gray);
  box-shadow: 1px 2px 10px 0px var(--primary);
`;

const ContentBox = styled.div`
  color: white;
  margin: 0% 2.5%;
  width: 20%;
  height: 20%;
  border-radius: 10%;
  background-color: darkblue;
  &.Btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default DailyCheck;
