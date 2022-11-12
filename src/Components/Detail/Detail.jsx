import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../style/Layout";
import Comments from "./Comment";
import { __postComments } from "../../redux/modules/CommentsSlice";
import {
  __delPosts,
  __getPostslById,
} from "../../redux/modules/DetailPostsSlice";
import { __getComments } from "../../redux/modules/CommentsSlice";
import CommentList from "./CommentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faSquare } from "@fortawesome/free-regular-svg-icons";

const Detail = () => {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log("포스트아이디", postid);
  const initialState = {
    comment: "",
  };
  const [comment, setComment] = useState(initialState);
  const { detail } = useSelector((state) => state.detail);
  console.log("Selector", detail?.data);
  useEffect(() => {
    dispatch(__getPostslById(postid));
  }, [dispatch]);
  const onDeleteHandler = (postid) => {
    const result = window.confirm("정말로 삭제하시겠습니까?");
    if (result) {
      dispatch(__delPosts(postid));
    } else {
      return;
    }
  };
  const onCommentHandler = () => {
    dispatch(__postComments());
    setComment(initialState);
  };

  const OnJoinHandler = () => {};
  return (
    <Wrapper>
      <Wrap>
        <Layout>
          <StContainer>
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
                <FontAwesomeIcon
                  style={{
                    color: "black",
                  }}
                  size="2x"
                  icon={faPenToSquare}
                />
                <Stgap />
                <FontAwesomeIcon
                  style={{
                    color: "black",
                  }}
                  size="2x"
                  icon={faPaperPlane}
                />
              </StContentWrap>
            </StHost>
            <div>
              <h2>{detail?.data?.title}</h2> {/* 제목 */}
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

            <Stbutton onClick={OnJoinHandler}>참가하기</Stbutton>
            {/* <button
            onClick={() => {
              navigate("/postsedit");
            }}
          >
            수정하기
          </button> */}
            {/* <button onClick={() => onDeleteHandler(detail?.data?._id)}>
            삭제
          </button> */}

            <StMap>지도가 들어갑니다</StMap>
          </StContainer>
        </Layout>
        {/* <CommentList /> */}
      </Wrap>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = styled.div`
  position: fixed;
  z-index: 40;
  display: block;
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
  background-color: var(--white);
  z-index: 42;
  display: block;
`;

const StContainer = styled.div`
  padding: 5% 8%;
  border: none;
  border-radius: 16px;
  background-color: #d7d7d7;
  margin: 10px;
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

const Stbutton = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 15px;
  margin: 5% 0 5% 0;
  border: none;
  background-color: white;
  font-size: large;
  font-weight: bold;
`;

const StMap = styled.div`
  width: 100%;
  height: 150px;
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
