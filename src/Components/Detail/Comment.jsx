import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// import {
//   __deleteComment,
//   __getComments,
//   __updateComment,
// } from "../redux/modules/CommentsSlice";

const Comments = ({ comment }) => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    // dispatch(__getComments());
  }, [dispatch]);

  const fnDeleteCommentHandler = (commentId) => {
    // const result = window.confirm("정말로 삭제하시겠습니까?");
    // if (result) {
    //   dispatch(__deleteComment(commentId));
    // } else {
    //   return;
    // }
  };

  const onClickChangeHandler = (commentId) => {
    // dispatch(__updateComment({ commentId, input }));
    // setEdit(false);
  };

  return (
    <CommentBox key={comment.id}>
      <CommentAuthor>{comment.commentAuthor}</CommentAuthor>
      {!isEdit ? (
        <>
          <CommentBody>{comment.commentBody}</CommentBody>
          <button onClick={() => setEdit(true)}>수정</button>
        </>
      ) : (
        <>
          <StText
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></StText>
          <button onClick={() => onClickChangeHandler(comment.id)}>저장</button>
        </>
      )}
      <button onClick={() => fnDeleteCommentHandler(comment.id)}>삭제</button>
    </CommentBox>
  );
};

export default Comments;

const CommentBox = styled.div`
  margin: 20px 0px 0px 50px;
  display: flex;
  border: 5px solid cadetblue;
  border-radius: 10px;
  padding: 5px;
  height: 90px;
`;
const CommentAuthor = styled.div`
  width: 100px;
  font-size: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
`;
const CommentBody = styled.div`
  font-size: 20px;
  width: 700px;
  height: 30px;
`;

const StText = styled.textarea`
  height: 30px;
  width: 700px;
  background-color: transparent;
  border: 1px solid transparent;
`;
