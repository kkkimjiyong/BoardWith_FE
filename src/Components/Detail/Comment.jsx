import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  __deleteComment,
  __editComment,
} from "../../redux/modules/CommentsSlice";
import { commentsApi } from "../../instance";
import axios from "axios";

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);

  const commentId = comments._id;

  const initialState = {
    comment: "",
  };
  const [comment, setComment] = useState(initialState);

  console.log("commentes", comment);

  const onEditHandler = () => {
    console.log("comment", comment);
    console.log(commentId);
    dispatch(__editComment({ comment, commentId }));
    setEdit(false);
  };
  //console.log("comments", comments);

  // const onEditHandler = () => {
  //   console.log("commentId", commentId);
  //   console.log("comment", { comment });
  //   commentsApi
  //     .editComments({
  //       comment: { comment },
  //       commentId: comments._id,
  //     })
  //     .then((res) => {
  //       console.log("res", res);
  //       //alert(res.data.message);
  //       setComment(initialState);
  //       // navigate(-1);
  //     })
  //     .catch((error) => {
  //       alert("잘못된 값을 입력하셨습니다.");
  //     });
  //   setEdit(false);
  // };

  const onDelCommentHandler = () => {
    const result = window.confirm("정말로 삭제하시겠습니까?");
    if (result) {
      console.log("comments", comments._id);
      dispatch(__deleteComment(comments._id));
    } else {
      return;
    }
  };

  return (
    <CommentBox key={comments.id}>
      {!isEdit ? (
        <>
          <CommentBody>{comments?.userId}</CommentBody>
          <CommentBody>{comments?.comment}</CommentBody>
          <button onClick={() => setEdit(true)}>수정</button>
        </>
      ) : (
        <>
          <StText
            placeholder="수정할 댓글내용을 입력하세요"
            value={comment.comment}
            onChange={(e) => {
              const { value } = e.target;
              setComment({
                ...comment,
                comment: value,
              });
            }}
            // onChange={(e) => {
            //   setComment(e.target.value);
            // }}
          ></StText>
          <button onClick={() => onEditHandler(comment.id)}>저장</button>
        </>
      )}
      <button onClick={() => onDelCommentHandler(comment.id)}>삭제</button>
    </CommentBox>
  );
};

export default Comments;

const CommentBox = styled.div`
  margin: 20px 0px 0px 50px;
  display: flex;
  border: 1px solid salmon;
  border-radius: 10px;
  padding: 5px;
  height: 40px;
`;

const CommentBody = styled.div`
  font-size: 20px;
  width: 700px;
  height: 30px;
`;

const StText = styled.textarea`
  height: 30px;
  width: 1000px;
  background-color: transparent;
  border-bottom: 1px solid;
  border-color: transparent transparent black transparent;
`;
