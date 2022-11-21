import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie } from "../../hooks/CookieHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const MyPage = () => {
  const [user, Setuser, onChange] = useInput();

  const navigate = useNavigate();

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

  useEffect(() => {
    getUser();
  }, []);
  // console.log({ visible: !user.visible });
  // 성별 보이게 안보이게 api

  const postVisible = async () => {
    try {
      const { data } = await axios.get(
        `https://www.iceflower.shop/users/visible/${user.userId}`,
        {
          headers: {
            Authorization: `${getCookie("accessToken")}`,
          },
        }
      );
      Setuser(data.messgae);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //*------------------  마이파티  --------------------------------
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

  if (!getCookie("accessToken")) {
    if (window.confirm("로그인이 필요한 페이지입니다!")) {
      window.location.replace("/");
    }
  } else {
    return (
      <Wrapper>
        <AvatarCtn>아바타들어올자리</AvatarCtn>
        <ProfileCtn>
          {" "}
          <EditBox onClick={() => navigate("/editpage")}>
            <EditBtn>편집</EditBtn>
          </EditBox>
          <ProfileRow>
            {" "}
            <div>{user?.nickName}</div>{" "}
          </ProfileRow>
          <ProfileRow>
            {user?.birth ? user?.birth : "없음"}/
            {user?.visible ? `${user?.gender}` : "숨김"}/
            {user?.address
              ? `${user?.address?.split(" ")[0]} ${
                  user?.address?.split(" ")[1]
                }`
              : "없음"}{" "}
            {user?.visible ? (
              <AiFillEyeInvisible size="24" onClick={() => postVisible()} />
            ) : (
              <AiFillEye size="24" onClick={() => postVisible()} />
            )}{" "}
          </ProfileRow>{" "}
          <LikeGameCtn>
            <LikeGameBox>
              {}
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
        </ProfileCtn>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const AvatarCtn = styled.div`
  display: flex;
  height: 40%;
`;

const EditBox = styled.div`
  width: 100%;
  height: 30%;
  padding: 10px;
  display: flex;
  justify-content: end;
`;

const EditBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    box-shadow: 0px 2px 2px 0px gray;
  }
`;

const ProfileCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9e9e9;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
  padding: 0px 50px;
  gap: 30px;
`;

const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: none;
`;

const ProfileRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const LikeGameCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 15vh;
  gap: 10px;
`;

const LikeGameBox = styled.div`
  display: flex;
  justify-content: left;

  gap: 15px;
`;

const LikeGame = styled.div`
  padding: 5px 15px;
  font-size: 14px;
  border: 2px solid black;
  border-radius: 30px;
`;

const IntroCtn = styled.div`
  border-top: 10px solid #be8eff;
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const IntroBox = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid #6900f9;
  height: 100%;
`;

const GenderImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  object-fit: cover;
`;

const MyPartyCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  gap: 30px;
`;

const MyPartyTitle = styled.div`
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
`;

const Arrow = styled.div`
  margin-top: 9px;
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: black;
`;

export default MyPage;
