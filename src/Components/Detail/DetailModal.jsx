import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BanComments from "./BanComment";
import Comments from "./Comment";
import Loading from "../../style/Loading";
import {
  __getComments,
  __postComments,
} from "../../redux/modules/CommentsSlice";
import { userApi } from "../../instance";
import { postApi } from "../../instance";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { AiOutlineMessage } from "@react-icons/all-files/ai/AiOutlineMessage";
import { AiOutlineCalendar } from "@react-icons/all-files/ai/AiOutlineCalendar";
import { FiShare } from "@react-icons/all-files/fi/FiShare";
import { FiMapPin } from "@react-icons/all-files/fi/FiMapPin";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { FaBullhorn } from "@react-icons/all-files/fa/FaBullhorn";
import { FaCrown } from "@react-icons/all-files/fa/FaCrown";
import { BsPeopleFill, BsArrowUpCircle, BsChevronLeft } from "react-icons/bs";
import AvatarBox from "../Avatar/AvatarBox";
import Modify from "../Main/Modify";
import AlertModal from "../AlertModal";

const { kakao } = window;
export const DetailModal = ({
  postid,
  setModalOpen,
  ModalOpen,
  closed,
  setItem,
  item,
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
  const [isClosed, setIsClosed] = useState(closed);
  const [isEdit, setIsEdit] = useState(false);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState();
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [alert, setAlert] = useState();
  const [content, setContent] = useState();
  const [confirm, setConfirm] = useState();
  const [confirmAdress, setconfirmAdress] = useState();
  const [confirmContent, setconfirmContent] = useState();
  const [cancelContent, setcancelContent] = useState();

  console.log(modifyModalOpen);
  // ??????

  //???????????? ??????
  const IsoStartDate = detail?.data.time[0];
  const IsoendDate = detail?.data.time[1];
  const startDate = new Date(IsoStartDate);
  const endDate = new Date(IsoendDate);

  const week = ["???", "???", "???", "???", "???", "???", "???"];

  const showTime =
    ("0" + (startDate.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + startDate.getDate()).slice(-2) +
    " (" +
    week[startDate.getDay()] +
    ") " +
    startDate.getHours() +
    ":00 ~ " +
    endDate.getHours() +
    ":00";
  // console.log(startDate, endDate);
  //????????? ?????? ?????? ?????????
  const postEditHandler = () => {
    !isEdit ? setIsEdit(true) : setIsEdit(false);
  };

  //???????????? ?????????-----------------------------------------
  const closePartyHandler = () => {
    console.log("??????");
    postApi
      .closeParty(postid)
      .then((res) => {
        setIsClosed(true);
        setAlert(true);
        setContent("????????? ????????? ?????????????????????.");
        console.log("??????", res);
        // console.log("isClosed", isClosed);
      })
      .catch((error) => {
        console.log("??????", error);
        // console.log("isClosed", isClosed);
      });
  };

  //??????????????? ?????????-----------------------------------------
  const openPartyHandler = () => {
    // console.log("detailtime", detail?.data?.time[1]);
    const time = { time: detail?.data?.time[1] };
    // console.log("time", time);
    // console.log("?????????");
    postApi
      .openParty({
        postid: postid,
        time: time,
      })
      .then((res) => {
        setIsClosed(false);
        setAlert(true);
        setContent("????????? ????????? ?????? ???????????????.");
        console.log("??????", res);
      })
      .catch((error) => {
        console.log("??????", error);
      });
  };

  //????????? ?????? ?????????-----------------------------------------
  const commentOnsumitHandler = () => {
    if (comment.comment === "") {
      setAlert(true);
      setContent("?????? ????????? ??????????????????.");
    } else {
      console.log("????????????");
      dispatch(__postComments({ comment, postid }));
      setComment(initialState);
      setAlert(true);
      setContent("?????? ?????? ??????!");
    }
  };
  //console.log("isCommentAuthor", isCommentAuthor);

  //todo????????? participant??? ?????????, confirm?????? ?????????
  //?????? ?????? ?????????-----------------------------------------
  const enterChatRoomHandler = () => {
    if (detail?.data?.confirmMember.includes(nickName)) {
      navigate(`/chat/${postid}`);
    } else {
      setAlert(true);
      setContent("????????? ?????? ????????? ??? ????????????.");
    }
  };

  //useEffect ????????? ????????? ????????????---------------------------------------
  useEffect(() => {
    userApi.getUser().then((res) => {
      setNickName(res.data.findUser.nickName);
    });
    postApi.getDetailId(postid).then((res) => {
      setDetail(res.data);
      console.log(res.data);
    });
    dispatch(__getComments(postid));
  }, [setModifyModalOpen, modifyModalOpen, x, y]);

  useEffect(() => {
    // ??????????????? ??????
    item?.nickName === nickName ? setIsHost(true) : setIsHost(false);

    //?????? ????????? ??????????????? ????????? ??????, ?????? ??????
    // setX(detail?.data.location?.x);
    // setY(detail?.data?.location?.y);
    setX(detail?.data.location?.x);
    setY(detail?.data.location?.y);
    console.log("??????");

    // ???????????? api ???????????? ?????? ?????????
    if (loading === false) {
      console.log(x, y);
      console.log("??????");
      const container = document?.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(y, x),
        level: 3,
      };
      // console.log(container);
      // console.log(options);
      //???????????? api ???????????? ?????? ?????? ?????? ??????
      const map = new kakao.maps.Map(container, options);
      const markerPosition = new kakao.maps.LatLng(y, x);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }

    //???????????? ????????????????????? ??????
    comments?.forEach(
      (comment) => nickName === comment?.nickName && setIsCommentAuthor(true)
    );
  }, [postApi.getDetailId(postid)]);
  //
  // console.log("comments", comments);

  useEffect(() => {
    //?????? ?????? ??????
    if (item?.closed === 0) {
      setIsClosed(false);
    } else if (item?.closed === 1) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
  }, [item]);

  // console.log(isHost);

  useEffect(() => {
    setLoading(false);
    dummy();
  }, []);

  const dummy = async () => {
    setLoading(true);
    console.log("??????", loading);
    await delay(1000);
    console.log("???", loading);
    setLoading(false);
  };
  const delay = (ms) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(ms);
      }, ms)
    );
  };
  //!----------------????????????????????? ---------------------
  useEffect(() => {
    // ???????????? sdk ??????
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const shareToKatalk = () => {
    // kakao sdk script ?????? ??? window.Kakao??? ??????
    if (window.Kakao) {
      const kakao = window.Kakao;
      // ?????? initialization ??????
      // ??????????????? ???????????? javascript key??? ???????????? initialize
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_JSPKEY);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: item?.title,
          description: item?.cafe,
          imageUrl: "https://i.ibb.co/4YJj0x9/image.png",
          link: {
            mobileWebUrl: `https://boardwith.vercel.app/posts/${postid}`,
            webUrl: `https://boardwith.vercel.app/posts/${postid}`,
          },
        },
      });
    }
  };

  return (
    <BackGroudModal>
      {alert && (
        <AlertModal
          setAlert={setAlert}
          content={content}
          confirmAddress={confirmAdress}
          cancelContent={cancelContent}
          confirmContent={confirmContent}
          confirm={confirm}
        />
      )}
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
                        <AiOutlineClose
                          onClick={() => setModalOpen(false)}
                          style={{
                            color: "white",
                          }}
                          size="30px"
                          cursor="pointer"
                        />
                      )}
                    </Sth>
                    <StHost>
                      <ProfileBox>
                        <FaCrown
                          style={{
                            color: "white",
                            position: "absolute",
                            top: "-5px",
                            left: "1.8%",
                          }}
                          size="20px"
                        />
                        <StAvatarContainer
                          onClick={() =>
                            navigate(`/userpage/${detail?.data?.nickName}`)
                          }
                        >
                          <AvatarBox
                            profile={true}
                            scale={0.2}
                            backScale={0.8}
                            circle={true}
                            userSelect={detail?.data.userAvatar}
                          />
                        </StAvatarContainer>
                        <NickName>{detail?.data?.nickName}</NickName>
                      </ProfileBox>
                      <StContentWrap>
                        {isHost && (
                          <FiEdit
                            onClick={() => {
                              setModifyModalOpen(true);
                            }}
                            style={{
                              fontSize: "26px",
                              color: "white",
                            }}
                            cursor="pointer"
                          />
                        )}
                        <Stgap />
                        <FiShare
                          style={{
                            fontSize: "26px",
                            color: "white",
                          }}
                          // size="lg"
                          onClick={shareToKatalk}
                          cursor="pointer"
                        />
                        <Stgap />
                        <AiOutlineMessage
                          style={{
                            fontSize: "26px",
                            color: "white",
                          }}
                          // size="lg"
                          onClick={() => {
                            enterChatRoomHandler();
                          }}
                          cursor="pointer"
                        />
                      </StContentWrap>
                    </StHost>
                    <div>
                      <h2
                        style={{
                          lineHeight: "1.5",
                        }}
                      >
                        {item?.title}
                      </h2>{" "}
                      {/* ?????? */}
                    </div>
                    <div>
                      <h4>{detail?.data?.content}</h4> {/* ?????? */}
                    </div>
                    <StContentWrap>
                      <FiMapPin
                        style={{
                          color: "white",
                        }}
                        size="23px"
                      />
                      <div />
                      <h5>{detail?.data?.cafe}</h5> {/* ?????? */}
                    </StContentWrap>
                    <StContentWrap>
                      <AiOutlineCalendar
                        style={{
                          color: "white",
                        }}
                        size="23px"
                      />
                      <div />
                      <h5>{showTime}</h5>
                      {/* ?????? */}
                    </StContentWrap>
                    <StContentWrap>
                      <BsPeopleFill
                        style={{
                          color: "white",
                        }}
                        size="23px"
                      />
                      <div />
                      <h5>
                        {detail?.data?.confirmMember?.length}/
                        {detail?.data?.partyMember}???
                      </h5>{" "}
                      {/* ?????? */}
                    </StContentWrap>
                    {isHost ? (
                      <StButtonWrap>
                        <Stbutton
                          onClick={() => {
                            if (sessionStorage.getItem("accessToken")) {
                              setOpen((open) => !open);
                            } else {
                              alert("???????????? ????????? ???????????????.");
                            }
                          }}
                        >
                          ???????????? ( {detail?.data?.participant?.length} ??? )
                        </Stbutton>

                        <Stbutton1
                          onClick={
                            !isClosed ? closePartyHandler : openPartyHandler
                          }
                        >
                          {!isClosed ? "????????????" : "????????????"}
                        </Stbutton1>
                      </StButtonWrap>
                    ) : (
                      <Stbutton
                        // disabled={closed}
                        className="innerDiv"
                        onClick={() => {
                          if (!isClosed) {
                            if (sessionStorage.getItem("accessToken")) {
                              setOpen((open) => !open);
                            } else {
                              setAlert(true);
                              setContent("???????????? ????????? ???????????????.");
                              setConfirm(true);
                              setconfirmContent("??????");
                              setconfirmAdress("/");
                              setcancelContent("??????");
                            }
                          } else {
                            setAlert(true);
                            setContent("????????? ???????????????!");
                          }
                        }}
                      >
                        ????????????
                      </Stbutton>
                    )}
                    {/* <KakaoMap key={comment._id} x={x} y={y} /> */}
                    <StMap id="map">????????? ???????????????</StMap>
                  </StContainer>
                  <StCommentList></StCommentList>
                </Wrap>
                {/*??????????????? ???-------------------------------------------------------- */}
                {/*?????? ???????????? ??????--------------------------------------------------------- */}
                <ListWrap onClick={(e) => e.stopPropagation()} open={open}>
                  <StCommentTitle>
                    <BsChevronLeft
                      style={{
                        color: "white",
                      }}
                      size="26px"
                      onClick={() => {
                        setOpen((open) => !open);
                      }}
                    />
                    <h3>{item?.title}</h3>
                    {isHost ? (
                      <h5 onClick={postEditHandler}>
                        {!isEdit ? "??????" : "??????"}
                      </h5>
                    ) : (
                      <div />
                    )}
                  </StCommentTitle>
                  {!isHost ? (
                    <StCommentbull>
                      <FaBullhorn
                        style={{
                          color: "white",
                          marginRight: "3%",
                        }}
                        size="20px"
                      />
                      ????????? ??????????????? ?????? ????????? ??????????????????!
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
                    {isEdit && (
                      <>
                        <p
                          style={{
                            marginLeft: "20px",
                            marginTop: "40px",
                          }}
                        >
                          ???????????????
                        </p>
                        {comments?.map((comment) => (
                          <BanComments
                            key={comment._id}
                            comments={comment}
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
                            minlength="1"
                            maxlength="20"
                            placeholder="?????? ????????? ???????????????"
                            onChange={(e) => {
                              const { value } = e.target;
                              setComment({
                                ...comment,
                                comment: value,
                              });
                            }}
                          />
                          <button>
                            <BsArrowUpCircle
                              style={{
                                color: "white",
                              }}
                              size="25px"
                            />
                          </button>
                        </form>
                      </Btnbox>
                    ) : (
                      <></>
                    )}
                  </div>{" "}
                  {modifyModalOpen && (
                    <Modify
                      setContent={setContent}
                      setAlert={setAlert}
                      item={item}
                      detail={detail}
                      setModalOpen={setModalOpen}
                      setDetail={setDetail}
                      setItem={setItem}
                      setModifyModalOpen={setModifyModalOpen}
                    />
                  )}
                </ListWrap>{" "}
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
  min-width: 370px;
  /* width: 340px; */
  width: 100%;
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
  //????????? z-index ?????? ??????
  -webkit-transform-style: preserve-3d;
  -webkit-transform: translateZ(-5px);
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
  padding: 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h3 {
    margin: 0 15px;
    max-width: 90%;
  }
  > h5 {
    cursor: pointer;
    min-width: 45px;
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

const ProfileBox = styled.div`
  width: 100px;
  height: 60px;
`;

const NickName = styled.div`
  min-width: 100px;
  display: flex;
  margin-left: 50px;
  font-weight: 600;
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
  //? -----????????????????????? ???????????? ?????????---------------
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #898989;
    //??????????????? ?????????????????? ?????????
    background-clip: padding-box;
    border: 4px solid transparent;
    border-radius: 15px;
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
  position: relative;
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
  width: 100px;
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
    background-color: var(--gray);
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
    background-color: var(--gray);
    color: white;
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

const StAvatarContainer = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
`;
