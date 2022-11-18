import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const MyParty = () => {
  const navigate = useNavigate();
  const [isOpen, SetisOpen] = useState();
  const [isOpen1, SetisOpen1] = useState();
  const [isOpen2, SetisOpen2] = useState();
  return (
    <div>
      <div onClick={() => navigate("/form")}>글쓰기</div>
      <MyPartyCtn>
        <MyPartyTitle onClick={() => SetisOpen(!isOpen)}>
          내가 속한 모임
          <Arrow />
        </MyPartyTitle>
        {/* 맵돌려야지~ */}
        {isOpen && (
          <MyPartyBox>
            {" "}
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
          </MyPartyBox>
        )}

        <MyPartyTitle onClick={() => SetisOpen1(!isOpen1)}>
          참여 신청 중인 모임
          <Arrow />
        </MyPartyTitle>
        {isOpen1 && (
          <MyPartyBox>
            {" "}
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
          </MyPartyBox>
        )}
        <MyPartyTitle onClick={() => SetisOpen2(!isOpen2)}>
          참여 확정 모임
          <Arrow />
        </MyPartyTitle>
        {isOpen2 && (
          <MyPartyBox>
            {" "}
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
            <MyPartyItem>불금 달리실 분~</MyPartyItem>
          </MyPartyBox>
        )}
      </MyPartyCtn>
    </div>
  );
};

const MyPartyCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top: 10px solid #be8eff;
  height: 100%;
`;

const MyPartyTitle = styled.div`
  padding: 20px 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  :active {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const MyPartyBox = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 130px;
  overflow-y: scroll;
  margin: 0 auto;
`;

const MyPartyItem = styled.div`
  color: white;
  background-color: #9747ff;
  border-radius: 20px;
  padding: 7px 20px;
`;

const Arrow = styled.div`
  margin-top: 9px;
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: black;
`;

export default MyParty;
