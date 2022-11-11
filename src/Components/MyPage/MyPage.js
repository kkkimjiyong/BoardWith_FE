import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie } from "../../hooks/CookieHook";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getDistance } from "geolib";

const MyPage = () => {
  // const [user, Setuser] = useState({});
  const [isEdit, SetisEdit] = useState(0);
  const [isOpen, SetisOpen] = useState();
  const [isOpen1, SetisOpen1] = useState();
  const [isOpen2, SetisOpen2] = useState();
  const [user, Setuser, onChange] = useInput();

  const onSubmitHandler = () => {
    const userPassword = prompt("수정하시려면 비밀번호를 입력해주세요!");
    SetisEdit(0);
    if (userPassword) {
      editUser({
        ...user,
        password: userPassword,
        confirm: userPassword,
      });
      console.log(user);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);
      if (data.myNewToken) {
        setCookie("accessToken", data.myNewToken);
        Setuser(data.findUser);
      } else {
        Setuser(data.findUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //수정할때 비밀번호를 넣어야함!!!!!!!!(비밀번호확인까지)
  const editUser = async (payload) => {
    try {
      const { data } = await userApi.editUser(payload);
      alert(data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Wrapper>
      <ProfileCtn>
        <ProfileBox />
        <div>항해99</div>
        <div>23세/여/서울</div>
      </ProfileCtn>
      <LikeGameCtn>
        <LikeGameTitle>선호게임</LikeGameTitle>
        <LikeGameBox>
          <LikeGame>#달무티</LikeGame>
          <LikeGame>#달무티</LikeGame>
          <LikeGame>#달무티</LikeGame>
        </LikeGameBox>

        {/* 맵돌려야지~ */}
      </LikeGameCtn>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 10px solid #be8eff;
  height: 20vh;
`;

const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: none;
  background-color: #be8eff;
`;

const LikeGameCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-top: 10px solid #be8eff;
  height: 15vh;
`;

const LikeGameTitle = styled.div`
  display: flex;
  padding: 20px 50px 0px 50px;
`;

const LikeGameBox = styled.div`
  display: flex;
  justify-content: left;
  padding: 20px 50px;
  gap: 15px;
`;

const LikeGame = styled.div`
  padding: 5px;
  border: 2px solid #6900f9;
  border-radius: 10px;
`;

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

export default MyPage;
