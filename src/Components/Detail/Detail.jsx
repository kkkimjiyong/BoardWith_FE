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

  //console.log("Selector", detail?.data?.userId);
  //console.log("Selector 아이디", detail.data.userId);

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

  return (
    <>
      <Layout>
        <StContainer>
          <h1>{detail?.data?.title}</h1>
          <div>
            <h3>내용: {detail?.data?.content}</h3>
            <h3>파티장: {detail?.data?.userId}</h3>
            <h3>장소: {detail?.data?.location}</h3>
            <h3>날짜: {detail?.data?.date}</h3>
            <h3>시간: {detail?.data?.time}</h3>
            <h3>인원: {detail?.data?.partyMember}</h3>
            <h3>참여자: {detail?.data?.userId}</h3>
          </div>
          <button>참가하기</button>
          <button
            onClick={() => {
              navigate("/postsedit");
            }}
          >
            수정하기
          </button>
          <button onClick={() => onDeleteHandler(detail?.data?._id)}>
            삭제
          </button>
        </StContainer>
      </Layout>
      <CommentList />
    </>
  );
};

export default Detail;

const StContainer = styled.div`
  padding: 8px;
  border: 1px solid;
  border-radius: 16px;
  background-color: white;
  margin: 10px;
`;
