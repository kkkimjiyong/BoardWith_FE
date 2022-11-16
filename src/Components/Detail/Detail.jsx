import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../style/Layout";
import Comments from "./Comment";
import { __getPostslById } from "../../Test/DetailPostsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  __getComments,
  __postComments,
} from "../../redux/modules/CommentsSlice";
import { userApi } from "../../instance";
import { postApi } from "../../instance";

const { kakao } = window;
const Detail = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    comment: "",
  };
  const [comment, setComment] = useState(initialState);
  const [isHost, setIsHost] = useState(false);
  const [nickName, setNickName] = useState();
  const [open, setOpen] = useState(false);
  const { comments } = useSelector((state) => state.comments.comments);
  // const { detail } = useSelector((state) => state.detail);
  const [x, setX] = useState();
  const [y, setY] = useState();

  const [detail, setDetail] = useState();

  console.log("detail", detail?.data);
  console.log("isHost", isHost);

  const handleIsHost = () => {
    console.log("여기언제타용");
  };

  console.log("nickName1", detail?.data?.nickName);
  console.log("nickName2", nickName);

  // const x = detail?.data?.location?.x;
  // const y = detail?.data?.location?.y;

  const handleMapInfo = () => {
    setX(detail?.data?.location?.x);
    setY(detail?.data?.location?.y);
    console.log("x", x);
    console.log("y", y);
    const container = document?.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(y, x),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(y, x);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    setDetail({ ...detail });
  };

  const commentOnsumitHandler = () => {
    if (comment.comment === "") {
      alert("댓글 내용을 입력해주세요");
    } else {
      dispatch(__postComments({ comment, postid }));
      setComment(initialState);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    // dispatch(__getPostslById(postid));
    userApi.getUser().then((res) => {
      setNickName(res.data.findUser.nickName);
    });
    postApi.getDetailId(postid).then((res) => {
      setDetail(res.data);
      localStorage.setItem(
        "Room",
        JSON.stringify({
          roomid: res.data.data._id,
          roomname: res.data.data.title,
        })
      );
    });
    dispatch(__getComments(postid));
    // handleMapInfo();
    handleIsHost();
  }, []);

  useEffect(() => {
    if (detail?.data?.nickName === nickName) {
      setIsHost(true);
    } else if (detail?.data?.nickName !== nickName) {
      setIsHost(false);
    } else {
      setIsHost(false);
    }

    setX(detail?.data?.location?.x);
    setY(detail?.data?.location?.y);
    console.log("x", x);
    console.log("y", y);
    const container = document?.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(y, x),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(y, x);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    // setDetail({ ...detail });
  }, [postApi.getDetailId(postid)]);

  return (
    <Wrapper>
      <Wrap>
        <Layout>
          {" "}
          <div onClick={() => navigate("/main")}>뒤로가기</div>
          <StContainer>
            {" "}
            <StHost>
              <div>
                <FontAwesomeIcon
                  style={{
                    color: "white",
                  }}
                  size="3x"
                  icon={faSquare}
                />
                <Stgap />
                <h4>{detail?.data?.nickName}</h4> {/* 닉네임 */}
              </div>
              <StContentWrap>
                {isHost ? (
                  <>
                    <FontAwesomeIcon
                      style={{
                        color: "black",
                      }}
                      size="2x"
                      icon={faPenToSquare}
                      onClick={() => {
                        navigate("/chat");
                      }}
                      cursor="pointer"
                    />
                    <Stgap />
                    <FontAwesomeIcon
                      style={{
                        color: "black",
                      }}
                      size="2x"
                      icon={faPaperPlane}
                      onClick={() => {
                        navigate("/chat");
                      }}
                      cursor="pointer"
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      style={{
                        color: "black",
                      }}
                      size="2x"
                      icon={faPaperPlane}
                      onClick={() => {
                        navigate("/chat");
                      }}
                      cursor="pointer"
                    />
                  </>
                )}
              </StContentWrap>
            </StHost>
            <div>
              <h3>{detail?.data?.title}</h3> {/* 제목 */}
            </div>
            <StContentWrap>
              <FontAwesomeIcon
                style={{
                  color: "black",
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
                  color: "black",
                }}
                size="1x"
                icon={faCalendar}
              />
              <div />
              <h4>{detail?.data?.time[0]}</h4> {/* 날짜 */}
            </StContentWrap>
            <StContentWrap>
              <FontAwesomeIcon
                style={{
                  color: "black",
                }}
                size="1x"
                icon={faUserGroup}
              />
              <div />
              <h4>{detail?.data?.partyMember}명</h4> {/* 인원 */}
            </StContentWrap>
            {isHost ? (
              <Stbutton>마감하기</Stbutton>
            ) : (
              <Stbutton
                className="innerDiv"
                onClick={() => {
                  setOpen((open) => !open);
                }}
              >
                참가하기
              </Stbutton>
            )}
            <StMap id="map">지도가 들어갑니다</StMap>
          </StContainer>
          <StCommentList></StCommentList>
        </Layout>
      </Wrap>
      <ListWrap open={open}>
        <div
          className="innerDiv"
          onClick={() => {
            setOpen((open) => !open);
          }}
        >
          {open ? "눌러서 댓글 내리기" : ""}
        </div>
        <div>
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
                placeholder="댓글내용을 입력하세요"
                onChange={(e) => {
                  const { value } = e.target;
                  setComment({
                    ...comment,
                    comment: value,
                  });
                }}
              />

              <button>추가하기</button>
            </form>
          </Btnbox>
          {/* {comments?.map((comment) => {
            return <Comments key={comment.id} comments={comment} />;
          })} */}

          {comments?.map((comment) => (
            <Comments key={comment._id} comments={comment} />
          ))}

          {/* {comments.map((comment) => (
            <div key={comment.id}>
              <Comments comment={comment} /> : null}
            </div>
          ))} */}
        </div>
      </ListWrap>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 5%;
`;

const Wrap = styled.div`
  width: 95%;
  position: fixed;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  padding: 24px 24px 40px;
`;

const StContainer = styled.div`
  padding: 5% 8%;
  border: none;
  border-radius: 16px;
  background-color: #d7d7d7;
  margin: 10px;
  width: 65%;
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
  margin: 2% 0 5% 0;
  border: none;
  background-color: white;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
`;

const StMap = styled.div`
  width: 100%;
  height: 200px;
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
const ListWrap = styled.div`
  width: 100%;

  background-color: white;
  height: ${({ open }) => (open ? "80%" : "0")};
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

const Btnbox = styled.div`
  form {
    display: flex;
    margin-top: 60px;
    justify-content: center;
  }
  input {
    border: 2px solid #d7d7d7;
    border-radius: 5px;
    height: 40px;
    width: 60%;
    padding: 0;
    margin-right: 20px;
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
    padding: 0;
    max-width: 200px;
    width: 30%;
    height: 40px;
    background-color: #d7d7d7;
    color: white;
    border: none;
    border-radius: 5px;
  }
  button:hover {
    opacity: 0.8;
    color: black;
    cursor: pointer;
  }
`;
