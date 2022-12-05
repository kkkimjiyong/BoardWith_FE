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
import { ReactComponent as Avatar } from "../../Assets/Avatar/Standard.svg";
import ReactDaumPost from "react-daumpost-hook";
import { useRef } from "react";
import MyPartyItem from "./MyPartyItem";
import { postsApi } from "../../instance";
import AvatarBox from "../Avatar/AvatarBox";
import Loading from "../../style/Loading";
import EditUser from "./EditUser";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

const MyPage = () => {
  const [user, setUser, onChange] = useInput();
  const [isOpen, SetisOpen] = useState(false);
  const [isOpen1, SetisOpen1] = useState(false);
  const [isOpen2, SetisOpen2] = useState(false);
  const [reservedParty, setReservedParty] = useState();
  const [confirmParty, setConfirmParty] = useState();
  const [bookmark, setBookmark] = useState([]);
  const [likeGame, setLikeGame] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //---------- 1초 로딩 후 렌더  ------------
  useEffect(() => {}, []);
  //? -----------------  API  -----------------------

  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);

      setLikeGame(data.findUser.likeGame);
      setUser(data.findUser);
      setReservedParty(data.partyReserved);
      setConfirmParty(data.partyGo);
      setBookmark(data.findUser.bookmarkData);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async () => {
    try {
      const { data } = await userApi.editUser(user);
      console.log(data.findUserData);
      setUser(data.findUserData);
    } catch (error) {
      console.log(error);
    }
  };

  //? ------------------  삭제 포스트 =========================

  const deletHandler = async (id) => {
    try {
      const { data } = await postsApi.deletePost(id);
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
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/");
  };

  //? --------------------  회원탈퇴  ---------------------

  const deleteUser = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACK_SERVER}/users`,
        {
          headers: {
            Authorization: `${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
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
  const postVisible = async (value) => {
    try {
      const { data } = await userApi.editUser({ visible: value });
      console.log(data.findUserData);
      setUser(data.findUserData);
    } catch (error) {
      console.log(error);
    }
  };

  //? --------------------- 다음포스트  --------------------------

  useEffect(() => {
    // getReserved();
    // getConfirm();
    if (!sessionStorage.getItem("accessToken")) {
      alert("로그인이 필요한 페이지입니다!");
      // window.location.replace("/");
      navigate("/");
    }
  }, []);

  const editHandler = () => {
    editUser();
    setOpenEdit(false);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <MainHeader>
          {openEdit ? (
            <AiOutlineClose
              size={"24"}
              onClick={() => setOpenEdit(!openEdit)}
              className="closeBtn"
            />
          ) : (
            <div className="gap" />
          )}
          <div className="headtxt">마이페이지</div>
          <RowBox>
            <div onClick={openEdit ? editHandler : () => setOpenEdit(true)}>
              {openEdit ? "완료" : "편집"}
            </div>
          </RowBox>
        </MainHeader>
        <AvatarBox userSelect={user?.userAvatar} />
        <ProfileCtn>
          {" "}
          <ProfileRow className="Topbox">
            {" "}
            <div>{user?.nickName} 님</div>{" "}
          </ProfileRow>
          <ProfileRow>
            <div>{user?.age ? `${user?.age} 살` : "없음"} /</div>
            <div>{user?.visible == "V" ? `${user?.gender}` : "숨김"} /</div>
            <div>
              {" "}
              {user?.myPlace.length
                ? `${user?.myPlace[0]} ${user?.myPlace[1]}`
                : "없음"}
            </div>

            <div className="visible">
              {" "}
              {user?.visible == "V" ? (
                <AiFillEye size="24" onClick={() => postVisible("H")} />
              ) : (
                <AiFillEyeInvisible
                  size="24"
                  onClick={() => postVisible("V")}
                />
              )}
            </div>
          </ProfileRow>
          <LikeGameCtn>
            <LikeGameBox>
              {likeGame?.map((game) => {
                if (likeGame.length >= 2) return <LikeGame>{game}</LikeGame>;
              })}
            </LikeGameBox>
          </LikeGameCtn>
          <MyPartyCtn>
            <MyPartyTitle onClick={() => SetisOpen(!isOpen)}>
              내가 찜한 모임
              <Arrow className={isOpen ? "open" : null} />
            </MyPartyTitle>
            {isOpen && (
              <MyPartyBox>
                {bookmark?.map((party) => {
                  return (
                    <MyPartyItem
                      deletHandler={deletHandler}
                      title={party.title}
                      postId={party.postId}
                    />
                  );
                })}
              </MyPartyBox>
            )}
            <MyPartyTitle onClick={() => SetisOpen1(!isOpen1)}>
              참여 신청 중인 모임
              <Arrow className={isOpen1 ? "open" : null} />
            </MyPartyTitle>
            {isOpen1 && (
              <MyPartyBox>
                {reservedParty?.map((party) => {
                  return (
                    <MyPartyItem
                      deletHandler={deletHandler}
                      title={party.title}
                      postId={party._id}
                    />
                  );
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
                  return (
                    <MyPartyItem
                      deletHandler={deletHandler}
                      title={party.title}
                      postId={party._id}
                    />
                  );
                })}
              </MyPartyBox>
            )}{" "}
          </MyPartyCtn>{" "}
          <BottomTxt>
            <div className="txtbox" onClick={() => logoutHandler()}>
              로그아웃
            </div>
            <div className="txtbox" onClick={() => deletUserHandler()}>
              회원탈퇴
            </div>
            <div
              className="txtbox-noborder"
              onClick={() =>
                window.open("https://forms.gle/83os3kHzPNmC22fTA", "_blank")
              }
            >
              고객문의
            </div>{" "}
          </BottomTxt>
        </ProfileCtn>{" "}
        <EditUser
          user={user}
          onChange={onChange}
          setUser={setUser}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
        />
        {/* <FormButton onClick={() => setFormModalOpen(true)}>
            <FontAwesomeIcon
              style={{
                color: "white",
              }}
              size="2x"
              icon={faPenToSquare}
            />
          </FormButton>
 {formModalOpen && (
          <Form setItems={setItems} setFormModalOpen={setFormModalOpen} />
        )} */}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  overflow-y: hidden;
`;

const MainHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--black);
  box-shadow: 0px 0.5px 15px 0.1px black;
  z-index: 100;
  color: white;
  padding: 3.5% 4% 3.5% 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .headtxt {
    margin-left: 10px;
    color: #fff;
    text-shadow: 0 0 7px black, 0 0 10px black, 0 0 21px #fff, 0 0 42px #d90368,
      0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368, 0 0 151px #d90368;
  }
  .closeBtn {
    margin-left: 2%;
  }
  .gap {
    width: 30px;
    margin-left: 2%;
  }
`;

const RowBox = styled.div`
  display: flex;
`;

const ProfileCtn = styled.div`
  z-index: 10;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  color: #d3d3d3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 56%;
  padding-top: 5%;
  padding-left: 10%;
  padding-bottom: 15%;
  padding: 5% 10% 15% 10%;
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
  margin-top: 2%;
  width: 100%;
  padding: 0px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.Topbox {
    justify-content: space-between;
  }
  .visible {
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin-left: 3%;
  }
`;

const LikeGameCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  margin-top: 5%;
`;

const MyPartyTitle = styled.div`
  color: #dadada;
  display: flex;
  align-items: center;
  margin-top: 10%;
  :active {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const MyPartyBox = styled.div`
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 50%;
`;
const BottomTxt = styled.div`
  margin-top: 15%;
  color: #6c6c6c;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  .txtbox {
    padding: 0px 20px;
    border-right: 1px solid #6c6c6c;
    :hover {
      text-decoration: underline;
    }
  }
  .txtbox-noborder {
    padding: 0px 20px;
    :hover {
      text-decoration: underline;
    }
  }
`;

const Arrow = styled.div`
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  margin-left: 5%;
  &.left {
    transform: rotate(270deg);
  }
  &.open {
    margin-top: 7px;
    transform: rotate(0deg);
  }
  &.head {
    margin-left: 0;
    border-top-color: white;
  }
`;

export default MyPage;
