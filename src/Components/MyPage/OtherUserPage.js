import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie, removeCookie } from "../../hooks/CookieHook";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BsPencil } from "@react-icons/all-files/bs/BsPencil";
import AvatarBox from "../Avatar/AvatarBox";
import { ReactComponent as Avatar } from "../../Assets/Avatar/Standard.svg";

const OtherUserPage = () => {
  const { nickname } = useParams();
  const [user, Setuser, onChange] = useInput();
  const [isOpen, SetisOpen] = useState(false);
  const [isOpen1, SetisOpen1] = useState(false);
  const [isOpen2, SetisOpen2] = useState(false);
  const [reservedParty, setReservedParty] = useState();
  const [confirmParty, setConfirmParty] = useState();
  const navigate = useNavigate();
  console.log(nickname);
  const getUser = async () => {
    try {
      const { data } = await userApi.getOtherUser(nickname);
      console.log(data);
      Setuser(data.lookOtherUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  // console.log({ visible: !user.visible });
  //? ------------------  로그아웃 -------------------

  const logoutHandler = (name) => {
    removeCookie(name);
    navigate("/");
  };
  console.log(Boolean(user?.myPlace));
  //? ------------------  로그아웃 -------------------

  const deleteUser = async () => {
    try {
      const { data } = await axios.delete("https://www.iceflower.shop/users", {
        headers: {
          Authorization: `${getCookie("accessToken")}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletUserHandler = (name) => {
    deleteUser();
    removeCookie(name);
    navigate("/");
  };

  //? ----------------- 성별 보이게 안보이게 api --------------------------

  useEffect(() => {
    // getReserved();
    // getConfirm();
    if (!getCookie("accessToken")) {
      alert("로그인이 필요한 페이지입니다!");
      // window.location.replace("/");
      navigate("/");
    }
  }, []);

  return (
    <Wrapper>
      <MainHeader>
        <Arrow className="head" onClick={() => navigate("/main")} />
        <div className="headtxt">{user?.nickName}님</div>
        <div></div>
      </MainHeader>
      {/* 범용성있게 아바타박스를 만든 뒤, 추가하자 */}
      {/* <AvatarBox userSelect={user?.userAvater} /> */}
      <AvatarCtn>
        <Avatar />
      </AvatarCtn>
      <ProfileCtn>
        <ProfileRow>
          <div>{user?.nickName}</div>{" "}
        </ProfileRow>
        <ProfileRow>
          {user?.age ? `${user?.age} 살` : "없음"}/
          {user?.visible ? `${user?.gender}` : "숨김"}/
          {user?.myPlace.length
            ? `${user?.myPlace[0]} ${user?.myPlace[1]}`
            : "없음"}{" "}
        </ProfileRow>
        <LikeGameCtn>
          <LikeGameBox>
            <LikeGame>#달무티</LikeGame>
            <LikeGame>#달무티</LikeGame>
            <LikeGame>#달무티</LikeGame>
          </LikeGameBox>

          {/* 맵돌려야지~ */}
        </LikeGameCtn>
      </ProfileCtn>{" "}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: var(--white);
`;

const MainHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--black);
  box-shadow: 0px 0.5px 15px 0.1px black;
  z-index: 999;
  color: white;
  padding: 3.5% 2% 3.5% 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 100px;
  .headtxt {
    margin-left: 10px;
    color: #fff;
    text-shadow: 0 0 7px black, 0 0 10px black, 0 0 21px #fff, 0 0 42px #d90368,
      0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368, 0 0 151px #d90368;
  }
`;

const RowBox = styled.div`
  display: flex;
  gap: 20px;
`;

const AvatarCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;
  width: 100%;
  padding: 20%;
`;

const EditBox = styled.div`
  width: 100%;
  height: 30%;
  padding: 10px 10% 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: #919191;
  :hover {
    cursor: pointer;
  }
`;

const EditBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 5rem;
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
  background-color: #484848;
  color: var(--white);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
  padding-top: 5%;
  padding-left: 10%;
  gap: 30px;
`;

const ProfileRow = styled.div`
  width: 100%;
  padding: 0px 10px;
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
  border-radius: 30px;
  background-color: var(--primary);
`;

const Arrow = styled.div`
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  &.left {
    margin-top: 7px;
    transform: rotate(270deg);
  }
  &.open {
    margin-top: 7px;
    transform: rotate(0deg);
  }
  &.head {
    border-top-color: white;
  }
`;

export default OtherUserPage;
