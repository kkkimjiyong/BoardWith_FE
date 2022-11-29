import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie, removeCookie } from "../../hooks/CookieHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";
import { ImExit } from "@react-icons/all-files/im/ImExit";
import { BsPencil } from "@react-icons/all-files/bs/BsPencil";
import { ReactComponent as Avatar } from "../../Assets/Avatar3.svg";
import ReactDaumPost from "react-daumpost-hook";
import { useRef } from "react";
import MyPartyItem from "./MyPartyItem";
import { QueryClient, useQuery } from "react-query";

const MyPage = () => {
  const [user, Setuser, onChange] = useInput();
  const [isOpen, SetisOpen] = useState(false);
  const [isOpen1, SetisOpen1] = useState(false);
  const [isOpen2, SetisOpen2] = useState(false);
  const [isEdit, SetisEdit] = useState(false);
  const [reservedParty, setReservedParty] = useState();
  const [confirmParty, setConfirmParty] = useState();
  const [likeGame, setLikeGame] = useState();
  const [ModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  //? -----------------  API  -----------------------

  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);

      setLikeGame(data.findUser.likeGame);
      Setuser(data.findUser);
      setReservedParty(data.partyReserved);
      setConfirmParty(data.partyGo);
    } catch (error) {
      console.log(error);
    }
  };

  const EditUser = async () => {
    try {
      const { data } = await userApi.editUser(user);
      console.log(data);
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
    alert("로그아웃 성공");
    removeCookie("accessToken");
    removeCookie("refreshToken");
    navigate("/");
  };

  //? --------------------  회원탈퇴  ---------------------

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
    alert("탈퇴 성공");
    deleteUser();
    removeCookie(name);
    navigate("/");
  };

  //? ----------------- 성별 보이게 안보이게 api --------------------------
  const postVisible = async () => {
    try {
      const { data } = await axios.put(
        `https://www.iceflower.shop/users`,
        { visible: !user.visible },
        {
          headers: {
            Authorization: `${getCookie("accessToken")}`,
          },
        }
      );
      Setuser({ ...user, visible: data.visible });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //? --------------------- 다음포스트  --------------------------

  const ref = useRef(null);

  const postConfig = {
    //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      Setuser({ ...user, myPlace: data.address });
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };
  const postCode = ReactDaumPost(postConfig);

  useEffect(() => {
    // getReserved();
    // getConfirm();
    if (!getCookie("accessToken")) {
      alert("로그인이 필요한 페이지입니다!");
      // window.location.replace("/");
      navigate("/");
    }
  }, []);

  console.log(ModalOpen);

  const editHandler = () => {
    EditUser();
    SetisEdit(false);
  };

  return (
    <Wrapper>
      <MainHeader>
        <Arrow className="head" onClick={() => navigate("/main")} />
        <div className="headtxt">마이페이지</div>
        <RowBox>
          <BsPencil size="30" onClick={() => SetisEdit(true)} />
        </RowBox>
      </MainHeader>
      {/* 범용성있게 아바타박스를 만든 뒤, 추가하자 */}
      {/* <AvatarBox userSelect={user?.userAvater} /> */}
      <AvatarCtn>
        {" "}
        <Avatar />
      </AvatarCtn>
      <ProfileCtn>
        {" "}
        <ProfileRow className="Topbox">
          {" "}
          <div>{user?.nickName}</div>{" "}
          {isEdit && <button onClick={editHandler}>완료</button>}
        </ProfileRow>
        {!isEdit && (
          <>
            <ProfileRow>
              {user?.age ? `${user?.age} 살` : "없음"}/
              {user?.visible ? `${user?.gender}` : "숨김"}/
              {user?.myPlace.length
                ? `${user?.myPlace[0]} ${user?.myPlace[1]}`
                : "없음"}{" "}
              {user?.visible ? (
                <AiFillEye size="24" onClick={() => postVisible()} />
              ) : (
                <AiFillEyeInvisible size="24" onClick={() => postVisible()} />
              )}
            </ProfileRow>
            <LikeGameCtn>
              <LikeGameBox>
                {likeGame?.map((game) => {
                  return <LikeGame>{game}</LikeGame>;
                })}
              </LikeGameBox>
            </LikeGameCtn>
          </>
        )}
        {isEdit && (
          <ProfileInputBox>
            {" "}
            <ProfileInput
              name="age"
              value={user?.age}
              placeholder={user?.age}
              onChange={onChange}
            />
            <ProfileInput
              name="gender"
              value={user?.gender}
              placeholder={user?.gender}
              onChange={onChange}
            />
            <ProfileInput
              name="address"
              onClick={postCode}
              // value={user?.myPlace}
              placeholder={"클릭하여 주소변경"}
            />
            <DaumPostBox ref={ref}></DaumPostBox>
          </ProfileInputBox>
        )}
        <MyPartyCtn>
          <MyPartyTitle onClick={() => SetisOpen(!isOpen)}>
            내가 찜한 모임
            <Arrow className={isOpen ? "open" : null} />
          </MyPartyTitle>
          <MyPartyTitle onClick={() => SetisOpen1(!isOpen1)}>
            참여 신청 중인 모임
            <Arrow className={isOpen1 ? "open" : null} />
          </MyPartyTitle>
          {isOpen1 && (
            <MyPartyBox>
              {reservedParty?.map((party) => {
                if (!party.closed) return <MyPartyItem party={party} />;
              })}
            </MyPartyBox>
          )}
          <MyPartyTitle onClick={() => SetisOpen2(!isOpen2)}>
            참여 확정 모임
            <Arrow className={isOpen2 ? "open" : null} />
          </MyPartyTitle>
          {isOpen2 && (
            <MyPartyBox>
              {confirmParty?.map((party) => {
                if (!party.closed) return <MyPartyItem party={party} />;
              })}
            </MyPartyBox>
          )}{" "}
          <EditBox>
            {" "}
            <div className="logout" onClick={deletUserHandler}>
              회원탈퇴
            </div>
            <ImExit size="30" onClick={() => logoutHandler("accessToken")} />
          </EditBox>
        </MyPartyCtn>{" "}
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
  gap: 80px;
  color: #919191;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProfileInputBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  width: 100%;
`;

const ProfileInput = styled.input`
  padding: 2.5%;
  margin: 0% 2%;
  width: 30%;
  border: none;
  border-radius: 10px;
`;

const DaumPostBox = styled.div``;

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
  overflow-y: hidden;
  overflow-y: scroll;
  //? -----모바일에서처럼 스크롤바 디자인---------------
  @media only screen and (min-width: 1200px) {
    ::-webkit-scrollbar {
      width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #898989;
      //스크롤바에 마진준것처럼 보이게
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 15px;
    }
  }
`;

const ProfileRow = styled.div`
  width: 100%;
  padding: 0px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  &.Topbox {
    justify-content: space-between;
  }
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
  margin-top: 2%;
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
  max-height: 50%;
`;

const Arrow = styled.div`
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  &.left {
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

export default MyPage;
