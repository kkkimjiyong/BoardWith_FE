import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../style/Layout";
import Comments from "./Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../style/Loading";

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
} from "@fortawesome/free-solid-svg-icons";
import {
  __getComments,
  __postComments,
} from "../../redux/modules/CommentsSlice";
import { userApi } from "../../instance";
import { postApi } from "../../instance";
import { getCookie } from "../../hooks/CookieHook";

const { kakao } = window;
export const DetailModal = ({
  postid,
  setModalOpen,
  ModalOpen,
  realStartTime,
  realEndTime,
}) => {
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
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();

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
    if (detail.data.confirm.includes(nickName)) {
      navigate(`/chat/${postid}`);
    } else {
      alert("확정된 이후 들어갈 수 있습니다.");
    }
  };

  //useEffect 디테일 데이터 불러오기---------------------------------------
  useEffect(() => {
    userApi.getUser().then((res) => {
      setNickName(res.data.findUser.nickName);
    });

    postApi.getDetailId(postid).then((res) => {
      setDetail(res.data);
    });
    dispatch(__getComments(postid));
  }, []);

  //useEffect 디테일 데이터 불러와지고 실행될 부분 (순서)---------------------
  // console.log(detail?.data?.nickName);
  // console.log(nickName);

  useEffect(() => {
    // 파티장인지 확인
    if (detail?.data?.nickName === nickName) {
      setIsHost(true);
    } else if (detail?.data?.nickName !== nickName) {
      setIsHost(false);
    } else {
      setIsHost(false);
    }
    //받은 게시글 데이터에서 위치의 위도, 경도 저장
    setX(detail?.data?.location?.x);
    setY(detail?.data?.location?.y);
    // 카카오맵 api 사용해서 지도 띄우기
    if (loading === false) {
      const container = document?.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(y, x),
        level: 3,
      };
      // console.log(container);
      // console.log(options);
      //카카오맵 api 사용해서 지도 위에 마커 찍기
      const map = new kakao.maps.Map(container, options);
      const markerPosition = new kakao.maps.LatLng(y, x);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
    //접속자가 댓글작성자인지 확인
    for (let i = 0; i < comments?.length; i++) {
      if (nickName === comments[i]?.nickName) {
        //console.log(comments[i]?.nickName);
        setIsCommentAuthor(true);
      }
    }
  });
  // [postApi.getDetailId(postid)]
  useEffect(() => {
    //파티 마감 상태
    if (detail?.data?.closed === 0) {
      setIsClosed(false);
    } else if (detail?.data?.closed === 1) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
  }, []);

  useEffect(() => {
    // api();
    // setLoading(false);
    dummy();
  }, []);

  const api = async () => {
    try {
      setLoading(false);
    } catch (e) {}
  };

  const dummy = async () => {
    setLoading(true);
    console.log("시작", loading);
    await delay(300);
    console.log("끝", loading);
    setLoading(false);
  };
  const delay = (ms) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(ms);
      }, ms)
    );
  };

  return (
    <>
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
                          style={{
                            borderRadius: "20px",
                            width: "50px",
                            height: "50px",
                            backgroundColor: "white",
                            // backgroundImage: `url(${detail?.data?.img})`,
                            backgroundSize: "cover",
                            backgroundImage: `url(https://r1.community.samsung.com/t5/image/serverpage/image-id/2304962i2F7C66D1874B9309/image-size/large?v=v2&px=999)`,
                          }}
                        />
                        <Stgap />
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
                          onClick={() => {
                            alert("공유기능 개발중!");
                          }}
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
                      <h3>{detail?.data?.title}</h3> {/* 제목 */}
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
                      <h4>{detail?.data?.cafe}</h4> {/* 장소 */}
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
                      <h4>{realStartTime + " ~ " + realEndTime}</h4>{" "}
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
                      <h4>{detail?.data?.partyMember}명</h4> {/* 인원 */}
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
                          예약현황 ({comments?.length}/
                          {detail?.data?.partyMember - 1})
                        </Stbutton>
                        {!isClosed ? (
                          <Stbutton1 onClick={closePartyHandler}>
                            마감하기
                          </Stbutton1>
                        ) : (
                          <Stbutton1 onClick={openPartyHandler}>
                            마감취소
                          </Stbutton1>
                        )}
                      </StButtonWrap>
                    ) : (
                      <Stbutton
                        className="innerDiv"
                        onClick={() => {
                          if (getCookie("accesstoken") !== null) {
                            setOpen((open) => !open);
                          } else {
                            alert("로그인이 필요한 기능입니다.");
                          }
                        }}
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
    </>
  );
};

export default DetailModal;

const StContainer = styled.div`
  color: #d7d7d7;
  padding: 5% 8%;
  border: none;
  border-radius: 16px;
  background-color: #d7d7d7;
  width: 85vw;
  /* width: 340px; */
  background-color: #343434;
  box-shadow: 3px 5px 20px 2px #5b5b5b;
`;

const StContainers = styled.div`
  position: fixed;
  z-index: 20;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
`;

const BackGroudModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 42;
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
  background-color: var(--gray);
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
  background-color: black;
  color: white;
  height: ${({ open }) => (open ? "100%" : "0")};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height 400ms ease-in-out;
  .innerDiv {
    position: fixed;
    width: 100%;
    background-color: #d7d7d7;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
  }
  overflow: scroll;
`;

const Wrapper = styled.div`
  position: fixed;
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
  background-color: var(--primary);
  width: 100%;
  position: fixed;
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
