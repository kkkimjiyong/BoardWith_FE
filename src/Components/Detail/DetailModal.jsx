import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../style/Layout";
import Comments from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../style/Loading";
import MainLogo from "../../Assets/LayoutLogo.png";
import {
  faCalendar,
  faCommentDots,
  faCircleUp,
} from "@fortawesome/free-regular-svg-icons";

import {
  faLocationDot,
  faUserGroup,
  faX,
  faChevronLeft,
  faBullhorn,
  faShareFromSquare,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";
import {
  __getComments,
  __postComments,
} from "../../redux/modules/CommentsSlice";
import { userApi } from "../../instance";
import { postApi } from "../../instance";
import { getCookie } from "../../hooks/CookieHook";

import { useQuery } from "react-query";

const { kakao } = window;
export const DetailModal = ({ postid, setModalOpen, ModalOpen, closed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = { comment: "" };
  const [comment, setComment] = useState(initialState);
  const [isHost, setIsHost] = useState(false);
  const [nickName, setNickName] = useState();
  const [open, setOpen] = useState(false);
  const { comments } = useSelector((state) => state.comments.comments);
  const [isCommentAuthor, setIsCommentAuthor] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [location, setLocation] = useState({ x: "", y: "" });
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [isBanUser, setIsBanUser] = useState(false);

  // 수정
  const [blacklist, setBlacklist] = useState();
  const [blacklists, setBlacklists] = useState([]);

  //? ---------------시간 (나중에 리팩토링) ----------------
  const moment = require("moment-timezone");
  const startDate = detail?.data?.time?.[0];
  const endDate = detail?.data?.time?.[1];
  const getStartTime = (startDate) => {
    var m = moment(startDate).tz("Asia/Seoul").locale("ko");
    return m.format("MM.DD (ddd) HH:mm");
  };
  const getEndTime = (endDate) => {
    var m = moment(endDate).tz("Asia/Seoul");
    return m.format("HH:mm");
  };
  const realStartTime = getStartTime(startDate);
  const realEndTime = getEndTime(endDate);
  // console.log(realStartTime, realEndTime);
  // console.log(startDate, endDate);
  
  //게시글 편집 상태 핸들러
  const postEditHandler = () => {
    !isEdit ? setIsEdit(true) : setIsEdit(false);
  };

  //파티마감 핸들러-----------------------------------------
  const closePartyHandler = () => {
    console.log("마감");
    postApi
      .closeParty(postid)
      .then((res) => {
        setIsClosed(true);
        alert("파티원 모집이 마감되었습니다");
        console.log("성공", res);
        // console.log("isClosed", isClosed);
      })
      .catch((error) => {
        console.log("에러", error);
        // console.log("isClosed", isClosed);
      });
  };
  // console.log(detail?.data?.closed);
  // console.log(isClosed);

  //파티리오픈 핸들러-----------------------------------------
  const openPartyHandler = () => {
    // console.log("detailtime", detail?.data?.time[1]);
    const time = { time: detail?.data?.time[1] };
    // console.log("time", time);
    // console.log("리오픈");
    postApi
      .openParty({
        postid: postid,
        time: time,
      })
      .then((res) => {
        setIsClosed(false);
        alert("파티원 모집을 다시 시작합니다.");
        console.log("성공", res);
      })
      .catch((error) => {
        console.log("에러", error);
      });
  };

  //코멘트 입력 핸들러-----------------------------------------
  const commentOnsumitHandler = () => {
    if (comment.comment === "") {
      alert("댓글 내용을 입력해주세요");
    } else {
      dispatch(__postComments({ comment, postid }));
      setComment(initialState);
    }
  };
  //console.log("isCommentAuthor", isCommentAuthor);

  //todo나중에 participant가 아니라, confirm으로 바뀔듯
  //채팅 입장 핸들러-----------------------------------------
  const enterChatRoomHandler = () => {
    if (detail?.data?.confirmMember.includes(nickName)) {
      navigate(`/chat/${postid}`);
    } else {
      alert("확정된 이후 들어갈 수 있습니다.");
    }
  };
  const isCommentAuthorFun = () => {
    //접속자가 댓글작성자인지 확인
    comments?.forEach(
      (comment) => nickName === comment?.nickName && setIsCommentAuthor(true)
    );
  };

  const setMap = () => {
    // 카카오맵 api 사용해서 지도 띄우기
    const container = document?.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(location.y, location.x),
      level: 3,
    };
    //카카오맵 api 사용해서 지도 위에 마커 찍기
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(location.y, location.x);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  };

  const isPartyClosed = () => {
    //파티 마감 상태
    if (detail?.data?.closed === 0) return setIsClosed(false);
    if (detail?.data?.closed === 1) return setIsClosed(true);
    else return setIsClosed(false);
  };

  const isHostFun = () => {
    // 파티장인지 확인\
    detail?.data?.nickName === nickName ? setIsHost(true) : setIsHost(false);
  };

  const dummyLoad = async () => {
    setLoading(true);
    console.log("로딩시작", loading);
    await delay(1000);
    console.log("로딩끝", loading);
    setLoading(false);
  };
  const delay = (ms) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(ms);
      }, ms)
    );
  };

  const closeHandler = () => {
    if (isClosed === false) {
      if (getCookie("accesstoken") !== null) {
        setOpen((open) => !open);
      } else {
        alert("로그인이 필요한 기능입니다.");
      }
    } else {
      alert("마감된 모임입니다!");
      return navigate("/main");
    }
  };

  const shareToKatalk = () => {
    // kakao sdk script 부른 후 window.Kakao로 접근
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      // 카카오에서 제공하는 javascript key를 이용하여 initialize
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_JSPKEY);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: detail?.data?.title,
          description: detail?.data?.cafe,
          imageUrl: "https://i.ibb.co/4YJj0x9/image.png",
          link: {
            mobileWebUrl: `https://boardwith.vercel.app/posts/${postid}`,
            webUrl: `https://boardwith.vercel.app/posts/${postid}`,
          },
        },
      });
    }
  };

  //useEffect 디테일 데이터 불러오기---------------------------------------
  useEffect(() => {
    userApi.getUser().then((res) => {
      setNickName(res?.data?.findUser?.nickName);
    });

    postApi.getDetailId(postid).then((res) => {
      setDetail(res?.data);
    });
    dispatch(__getComments(postid));
  }, []);

  // console.log(detail?.data?.nickName);
  // console.log(nickName);

  useEffect(() => {
    //useEffect 디테일 데이터 불러와지고 실행될 부분---------------------
    setLocation({ x: detail?.data?.location?.x, y: detail?.data?.location?.y }); //받은 게시글 데이터에서 위치의 위도, 경도 저장
    isHostFun(); //파티장인지
    isCommentAuthorFun(); //댓글 작성자인지
    isPartyClosed(); //파티마감인지
    if (loading === false) {
      //로딩 끝나면 맵 띄우기
      setMap();
    }
  }, [postApi.getDetailId(postid)]);
  //[postApi.getDetailId(postid)]

  // console.log(isHost);

  useEffect(() => {
    dummyLoad();
  }, []);

  // console.log("closed", isClosed);

  //!----------------카카오공유하기 ---------------------
  useEffect(() => {
    // 카카오톡 sdk 추가
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // console.log(process.env.REACT_APP_KAKAO_JSPKEY);
  return (
    <BackGroudModal>
      <StContainers onClick={() => setModalOpen(false)}>
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <BackGroudModal>
              <Wrapper>
                <Wrap onClick={(e) => e.stopPropagation()}>
                  <StContainer>
                    <Sth>
                      {open ? (
                        ""
                      ) : (
                        <FontAwesomeIcon
                          onClick={() => setModalOpen(false)}
                          style={{
                            color: "white",
                          }}
                          size="1x"
                          icon={faX}
                          cursor="pointer"
                        />
                      )}
                    </Sth>
                    <StHost>
                      <div>
                        <div
                          onClick={() =>
                            navigate(`/userpage/${detail?.data?.nickName}`)
                          }
                          style={{
                            borderRadius: "20px",
                            width: "40px",
                            height: "40px",
                            backgroundColor: "white",
                            // backgroundImage: `url(${detail?.data?.img})`,
                            backgroundSize: "cover",
                            backgroundImage: `url(https://r1.community.samsung.com/t5/image/serverpage/image-id/2304962i2F7C66D1874B9309/image-size/large?v=v2&px=999)`,
                          }}
                        />
                        <Stgap />
                        <FontAwesomeIcon
                          style={{
                            color: "white",
                            marginRight: "5px",
                          }}
                          size="1x"
                          icon={faCrown}
                        />
                        <h4>{detail?.data?.nickName}</h4> {/* 닉네임 */}
                      </div>
                      <StContentWrap>
                        <FontAwesomeIcon
                          style={{
                            fontSize: "25px",
                            color: "white",
                          }}
                          // size="lg"
                          icon={faShareFromSquare}
                          onClick={shareToKatalk}
                          cursor="pointer"
                        />
                        <Stgap />
                        <FontAwesomeIcon
                          style={{
                            fontSize: "27px",
                            color: "white",
                          }}
                          // size="lg"
                          icon={faCommentDots}
                          onClick={() => {
                            enterChatRoomHandler();
                          }}
                          cursor="pointer"
                        />
                      </StContentWrap>
                    </StHost>
                    <div>
                      <h2>{detail?.data?.title}</h2> {/* 제목 */}
                    </div>
                    <div>
                      <h4>{detail?.data?.content}</h4> {/* 제목 */}
                    </div>
                    <StContentWrap>
                      <FontAwesomeIcon
                        style={{
                          color: "white",
                        }}
                        size="1x"
                        icon={faLocationDot}
                      />
                      <div />
                      <h5>{detail?.data?.cafe}</h5> {/* 장소 */}
                    </StContentWrap>
                    <StContentWrap>
                      <FontAwesomeIcon
                        style={{
                          color: "white",
                        }}
                        size="1x"
                        icon={faCalendar}
                      />
                      <div />
                      <h5>{realStartTime + " ~ " + realEndTime}</h5>{" "}
                      {/* 날짜 */}
                    </StContentWrap>
                    <StContentWrap>
                      <FontAwesomeIcon
                        style={{
                          color: "white",
                        }}
                        size="1x"
                        icon={faUserGroup}
                      />
                      <div />
                      <h5>{detail?.data?.partyMember}명</h5> {/* 인원 */}
                    </StContentWrap>
                    {isHost ? (
                      <StButtonWrap>
                        <Stbutton
                          onClick={() => {
                            if (getCookie("accesstoken") !== null) {
                              setOpen((open) => !open);
                            } else {
                              alert("로그인이 필요한 기능입니다.");
                            }
                          }}
                        >
                          예약현황 ( {comments?.length} 명 )
                        </Stbutton>
                        {/* {!closed ? (
                          <Stbutton1 onClick={closePartyHandler}>
                            마감하기
                          </Stbutton1>
                        ) : (
                          <Stbutton1 onClick={openPartyHandler}>
                            마감취소
                          </Stbutton1>
                        )} */}

                        <Stbutton1
                          onClick={
                            !closed ? closePartyHandler : openPartyHandler
                          }
                        >
                          {!closed ? "마감하기" : "마감취소"}{" "}
                        </Stbutton1>
                      </StButtonWrap>
                    ) : (
                      <Stbutton
                        // disabled={closed}
                        className="innerDiv"
                        onClick={closeHandler}
                      >
                        참가하기
                      </Stbutton>
                    )}
                    {/* <KakaoMap key={comment._id} x={x} y={y} /> */}
                    <StMap id="map">지도가 들어갑니다</StMap>
                  </StContainer>
                  <StCommentList></StCommentList>
                </Wrap>
                {/*상세페이지 끝-------------------------------------------------------- */}

                {/*댓글 슬라이드 시작--------------------------------------------------------- */}
                <ListWrap onClick={(e) => e.stopPropagation()} open={open}>
                  <StCommentTitle>
                    <FontAwesomeIcon
                      style={{
                        color: "white",
                      }}
                      size="1x"
                      icon={faChevronLeft}
                      onClick={() => {
                        setOpen((open) => !open);
                      }}
                    />
                    <h3>{detail?.data?.title}</h3>
                    {!isEdit ? (
                      <h5 onClick={postEditHandler}>편집</h5>
                    ) : (
                      <h5 onClick={postEditHandler}>취소</h5>
                    )}
                  </StCommentTitle>
                  {!isHost ? (
                    <StCommentbull>
                      <FontAwesomeIcon
                        style={{
                          color: "white",
                          marginRight: "3%",
                        }}
                        size="1x"
                        icon={faBullhorn}
                      />
                      파티를 희망하시는 분은 댓글로 신청해주세요!
                    </StCommentbull>
                  ) : (
                    <></>
                  )}
                  <div>
                    {!isBanUser && (
                      <>
                        {comments?.map((comment) => (
                          <Comments
                            key={comment._id}
                            comments={comment}
                            isHost={isHost}
                            nickName={nickName}
                            postid={postid}
                            detail={detail?.data}
                            isPostEdit={isEdit}
                            setModalOpen={setModalOpen}
                            ModalOpen={ModalOpen}
                            open={open}
                            setOpen={setOpen}
                          />
                        ))}
                      </>
                    )}
                    {/* {isEdit && (
                      <>
                        <p
                          style={{
                            marginLeft: "20px",
                            marginTop: "40px",
                          }}
                        >
                          블랙리스트
                        </p>
                        {isBanUser && (
                          <>
                            {comments?.map((comment) => (
                              <Comments
                                key={comment._id}
                                comments={comment}
                                isHost={isHost}
                                nickName={nickName}
                                postid={postid}
                                detail={detail?.data}
                                isPostEdit={isEdit}
                                setModalOpen={setModalOpen}
                                ModalOpen={ModalOpen}
                                open={open}
                                setOpen={setOpen}
                              />
                            ))}
                          </>
                        )}
                      </>
                    )} */}

                    {!isCommentAuthor && !isHost && open ? (
                      <Btnbox>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            commentOnsumitHandler(comment);
                          }}
                        >
                          <input
                            value={comment.comment}
                            type="text"
                            placeholder="신청 내용을 입력하세요"
                            onChange={(e) => {
                              const { value } = e.target;
                              setComment({
                                ...comment,
                                comment: value,
                              });
                            }}
                          />
                          <button>
                            <FontAwesomeIcon
                              style={{
                                color: "black",
                              }}
                              size="2x"
                              icon={faCircleUp}
                            />
                          </button>
                        </form>
                      </Btnbox>
                    ) : (
                      <></>
                    )}
                  </div>
                </ListWrap>
              </Wrapper>
            </BackGroudModal>
            <StBackGroundColor onClick={() => setModalOpen(false)} />
          </>
        )}
      </StContainers>
    </BackGroudModal>
  );
};

export default DetailModal;

const StContainer = styled.div`
  color: #d7d7d7;
  padding: 5% 8%;
  border: none;
  border-radius: 16px;
  background-color: #d7d7d7;
  min-width: 370px;
  /* width: 340px; */
  width: 90vw;
  max-width: 500px;
  background-color: #343434;
  //box-shadow: 3px 5px 20px 2px #5b5b5b;
`;

const StContainers = styled.div`
  z-index: 20;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
`;

const BackGroudModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  /* position: fixed;
  left: 50%;
  top: 50vh;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  z-index: 42;
  display: block; */
`;

const StButtonWrap = styled.div`
  gap: 5px;
  display: flex;
`;

const StCommentbull = styled.div`
  margin: 0 3%;
  padding: 3% 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  border-radius: 12px;
  font-size: 14px;
`;

const StCommentTitle = styled.div`
  padding: 0 3%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h5 {
    cursor: pointer;
  }
`;

const Sth = styled.div`
  width: 100%;
  z-index: 50;
  display: flex;
  color: white;
  font-size: 20px;
  justify-content: flex-end;
`;

const StBackGroundColor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const ListWrap = styled.div`
  z-index: 235;
  width: 100%;
  background-color: var(--black);
  color: white;
  height: ${({ open }) => (open ? "100%" : "0")};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height 400ms ease-in-out;
  .innerDiv {
    position: absolute;
    width: 100%;
    background-color: #d7d7d7;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
  }
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

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StHost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    > div {
      width: 10px;
    }
  }
`;

const StContentWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  height: 40px;
  > div {
    width: 2%;
  }
`;

const StCommentList = styled.div`
  margin-top: 100%;
`;

const Stbutton = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 15px;
  margin: 2% 2% 5% 0;
  border: none;
  background-color: var(--primary);
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

const Stbutton1 = styled.button`
  background-color: var(--primary);
  color: white;
  width: 40%;
  height: 45px;
  border-radius: 15px;
  margin: 2% 0 5% 0;
  border: none;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

const StMap = styled.div`
  width: 100%;
  height: 25vh;
  border-radius: 15px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Stgap = styled.div`
  width: 10px;
`;

const Btnbox = styled.div`
  border-top: 1px solid #5d5d5d;
  background-color: var(--black);
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;

  > form {
    border-radius: 20px;
    width: 90%;
    background-color: white;
    display: flex;
    margin: 3% 0;
    justify-content: center;
    align-items: center;
  }

  input {
    border: none;
    border-radius: 5px;
    height: 40px;
    width: 70%;
    padding: 0;
    margin-right: 10px;
    justify-content: center;
    text-indent: center;
    text-align: center;
  }
  input:nth-child(2) {
    width: 400px;
  }
  input:focus {
    outline: none;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.8;
    color: white;
    cursor: pointer;
  }
`;
