import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie } from "../../hooks/CookieHook";
import male from "../../Assets/free-icon-female-2404482.png";
import female from "../../Assets/free-icon-gender-symbol-5272547.png";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [isOpen, SetisOpen] = useState();
  const [isOpen1, SetisOpen1] = useState();
  const [isOpen2, SetisOpen2] = useState();
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
  console.log(user?.img);
  useEffect(() => {
    getUser();
  }, []);

  if (getCookie("accessToken")) {
    return (
      <Wrapper>
        <ProfileCtn>
          {" "}
          <EditBox onClick={() => navigate("/editpage")}>
            <EditBtn>편집</EditBtn>
          </EditBox>
          <ProfileBox
            style={{
              backgroundImage: `url(${user?.img})`,
              backgroundSize: "cover",
            }}
          />
          <ProfileName>
            {" "}
            <div>{user?.nickName}</div>{" "}
            <GenderImg
              src={user?.gender === "female" ? female : male}
              alt="React"
            />
          </ProfileName>
          <div>
            {user?.birth}/{user?.gender}/{user?.address?.split(" ")[0]}&nbsp;
            {user?.address?.split(" ")[1]}
          </div>
        </ProfileCtn>
        <LikeGameCtn>
          <LikeGameTitle>선호게임</LikeGameTitle>
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
  } else {
    return <div>로그인이 필요합니다!</div>;
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  border-top: 10px solid #be8eff;
  height: 20vh;
`;

const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: none;
`;

const ProfileName = styled.div`
  display: flex;
  gap: 4px;
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

const GenderImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  object-fit: cover;
`;

export default MyPage;
