import { style } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components";
import { userApi } from "../../instance";

const Tutorial = ({ setIsTutorial, setSelfCheck }) => {
  const [next, setNext] = useState(1);
  const doneTutorial = async () => {
    try {
      const { data } = await userApi.editUser({ tutorial: true });
      console.log(data);
      setIsTutorial(false);
      setSelfCheck(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BackGround>
      <div className="MainMsg">말풍선을 클릭하여, 튜토리얼을 완수하세요!</div>

      {next === 1 && (
        <NearDetail onClick={() => setNext(2)}>
          <ContentBox> 가장 가까운 모임을 보여주는 기능입니다.</ContentBox>
        </NearDetail>
      )}
      {next === 2 && (
        <Filter onClick={() => setNext(3)}>
          <ContentBox className="right">
            원하는 조건에 맞추어 모임을 검색할 수 있는 기능입니다.
          </ContentBox>
        </Filter>
      )}
      {next === 3 && (
        <Avatar onClick={() => setNext(4)}>
          <BottomContentBox className="right">
            모임활동을 통해, 포인트를 얻어 아바타를 사입으세요!
          </BottomContentBox>
        </Avatar>
      )}

      {next === 4 && (
        <DoneModal>
          <DoneLine>
            {" "}
            축하드립니다! 튜토리얼 완성 +300P 지급!
            <DoneBtn onClick={doneTutorial}>완료</DoneBtn>
          </DoneLine>
        </DoneModal>
      )}
    </BackGround>
  );
};

const BackGround = styled.div`
  z-index: 140;
  color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .MainMsg {
    margin-bottom: 18%;
    animation: neon 2s ease infinite;
    -moz-animation: neon 2s ease infinite;
    -webkit-animation: neon 2s ease infinite;
    @keyframes neon {
      0%,
      100% {
        text-shadow: 0 0 1vw #fa1c16, 0 0 3vw #fa1c16, 0 0 10vw #fa1c16,
          0 0 10vw #fa1c16, 0 0 0.4vw #fed128, 0.5v 0.5vw 0.1vw #806914;
        color: var(--primary);
      }
      50% {
        text-shadow: 0 0 0.5vw #800e0b, 0 0 1.5vw #800e0b, 0 0 5vw #800e0b,
          0 0 5vw #800e0b, 0 0 0.2vw #800e0b, 0.5vw 0.5vw 0.1vw #40340a;
        color: white;
      }
    }
  }
`;

const NearDetail = styled.div`
  position: absolute;
  top: 7%;
  left: 6%;
`;

const Filter = styled.div`
  position: absolute;
  top: 12%;
  right: 6%;
`;

const Avatar = styled.div`
  position: absolute;
  bottom: 11%;
  right: 6%;
`;

const ContentBox = styled.div`
  color: var(--white);
  position: relative;
  background: #484848;
  border-radius: 0.4em;
  padding: 15px 15px;
  max-width: 180px;
  :hover {
    cursor: pointer;
  }
  &.right {
    max-width: 250px;
    ::after {
      content: "";
      position: absolute;
      top: -38%;
      left: 80%;
      width: 0;
      height: 0;
      border: 50px solid transparent;
      border-bottom-color: #484848;
      border-top: 0;
      border-right: 0;
      margin-right: -10px;
      margin-top: -20px;
    }
  }
  :after {
    content: "";
    position: absolute;
    top: 0;
    left: 15%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom-color: #484848;
    border-top: 0;
    border-left: 0;
    margin-left: -10px;
    margin-top: -20px;
  }
`;

const BottomContentBox = styled.div`
  position: relative;
  background: #484848;
  border-radius: 0.4em;
  padding: 15px 15px;
  max-width: 260px;
  :hover {
    cursor: pointer;
  }
  :after {
    content: "";
    position: absolute;
    bottom: 5%;
    left: 53%;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top-color: #484848;
    border-bottom: 0;
    border-left: 0;
    margin-left: -23px;
    margin-bottom: -46px;
  }
`;

const DoneModal = styled.div`
  position: absolute;
  border-radius: 5%;
  width: 80%;
  padding: 3%;
  height: 50%;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DoneLine = styled.div`
  position: absolute;
  border-radius: 5%;
  width: 95%;
  height: 95%;
  border: 3px solid var(--primary);
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DoneBtn = styled.div`
  padding: 5% 0%;
  width: 80%;
  height: 5%;
  border-radius: 20px;
  bottom: 5%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  :hover {
    cursor: pointer;
  }
`;

export default Tutorial;
