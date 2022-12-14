import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { useNavigate, useParams } from "react-router-dom";

import AvatarBox from "../Avatar/AvatarBox";
import MyPartyItem from "./MyPartyItem";
import Loading from "../../style/Loading";

const OtherUserPage = () => {
  const [user, setUser, onChange] = useInput();
  const [isOpen, SetisOpen] = useState(false);
  const [isOpen1, SetisOpen1] = useState(false);
  const [isOpen2, SetisOpen2] = useState(false);
  const [reservedParty, setReservedParty] = useState();
  const [confirmParty, setConfirmParty] = useState();
  const [bookmark, setBookmark] = useState([]);
  const [likeGame, setLikeGame] = useState();
  const [isLoading, setIsLoading] = useState();
  const [ModalOpen, setModalOpen] = useState();

  const navigate = useNavigate();
  const { nickname } = useParams();

  //---------- 1초 로딩 후 렌더  ------------
  useEffect(() => {
    getUser();
  }, []);

  //? -----------------  API  -----------------------

  const getUser = async () => {
    try {
      const { data } = await userApi.getOtherUser(nickname);
      console.log(data);
      setLikeGame(data.lookOtherUser.likeGame);
      setUser(data.lookOtherUser);
      setReservedParty(data.partyReserved);
      setConfirmParty(data.partyGo);
      setBookmark(data.bookmarkData);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <MainHeader>
          <Arrow className="head" onClick={() => navigate(-1)} />
          <div className="headtxt">{user?.nickName}님</div>
          <div></div>
        </MainHeader>
        <AvatarCtn>
          {" "}
          <AvatarBox
            userSelect={user?.userAvatar}
            circle={true}
            backScale={0.7}
            scale={0.7}
          />
        </AvatarCtn>
        <ProfileCtn>
          <ProfileRow>
            <div>{user?.nickName}</div>{" "}
          </ProfileRow>
          {user?.visible == "V" && (
            <ProfileRow>
              <div>{user?.age ? `${user?.age} 살` : "없음"} /</div>
              <div>{user?.gender ? `${user?.gender}` : "없음"} /</div>
              <div>
                {" "}
                {user?.myPlace.length
                  ? `${user?.myPlace[0]} ${user?.myPlace[1]}`
                  : "없음"}
              </div>
            </ProfileRow>
          )}
          {user?.visible == "H" && <div>비공개</div>}
          <LikeGameCtn>
            <LikeGameBox>
              {likeGame?.map((game) => {
                return <LikeGame>{game}</LikeGame>;
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
                {" "}
                {bookmark?.length === 0 && (
                  <div className="fontweight">비어있습니다.</div>
                )}
                {bookmark?.map((party) => {
                  return (
                    <MyPartyItem
                      ModalOpen={ModalOpen}
                      setModalOpen={setModalOpen}
                      title={party.title}
                      party={party}
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
                {reservedParty?.length === 0 && (
                  <div className="fontweight">비어있습니다.</div>
                )}
                {reservedParty?.map((party) => {
                  return (
                    <MyPartyItem
                      ModalOpen={ModalOpen}
                      setModalOpen={setModalOpen}
                      title={party.title}
                      party={party}
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
                {confirmParty?.length === 0 && (
                  <div className="fontweight">비어있습니다.</div>
                )}
                {confirmParty?.map((party) => {
                  return (
                    <MyPartyItem
                      ModalOpen={ModalOpen}
                      setModalOpen={setModalOpen}
                      title={party.title}
                      party={party}
                      postId={party._id}
                    />
                  );
                })}
              </MyPartyBox>
            )}{" "}
          </MyPartyCtn>{" "}
        </ProfileCtn>{" "}
      </Wrapper>
    );
  }
};
const AvatarCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  margin: 5% 0%;
  z-index: 9;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--black);
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
  height: 100%;
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
  margin-top: 10%;
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
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 50%;
`;

const Arrow = styled.div`
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  :hover {
    cursor: pointer;
  }
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
