import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../../hooks/CookieHook";

const MyParty = () => {
  const navigate = useNavigate();
  const [isOpen, SetisOpen] = useState();
  const [isOpen1, SetisOpen1] = useState();
  const [isOpen2, SetisOpen2] = useState();
  const [reservedParty, setReservedParty] = useState();
  const [confirmParty, setConfirmParty] = useState();
  const getReserved = async () => {
    try {
      const { data } = await axios.get(
        "https://www.iceflower.shop/users/partyReserved",
        {
          headers: { Authorization: `${getCookie("accessToken")}` },
        }
      );
      console.log(data);
      setReservedParty(data.partyReservedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getConfirm = async () => {
    try {
      const { data } = await axios.get(
        "https://www.iceflower.shop/users/partyGo",
        {
          headers: { Authorization: `${getCookie("accessToken")}` },
        }
      );
      console.log(data);
      setConfirmParty(data.partyGoData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReserved();
    getConfirm();
  }, []);

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
            {reservedParty?.map((party) => {
              return <MyPartyItem>{party?.title}</MyPartyItem>;
            })}
          </MyPartyBox>
        )}
        <MyPartyTitle onClick={() => SetisOpen2(!isOpen2)}>
          참여 확정 모임
          <Arrow />
        </MyPartyTitle>
        {isOpen2 && (
          <MyPartyBox>
            {confirmParty?.map((party) => {
              return <MyPartyItem>{party?.title}</MyPartyItem>;
            })}
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
  max-height: 130px;
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
