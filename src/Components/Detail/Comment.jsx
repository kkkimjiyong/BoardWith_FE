import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  __deleteComment,
  __editComment,
} from "../../redux/modules/CommentsSlice";

const Comments = ({ comment }) => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);

  //const { commentId } = comments._id;
  const commentId = comment._id;
  const commentsID = "636cf5f010493b7d10c84ffd";
  //console.log(commentId);
  //console.log(comments._id);
  //console.log("코멘트", comments);

  const initialState = {
    comment: "",
  };
  const [comments, setComments] = useState(initialState);
  console.log(comments);

  const onEditHandler = () => {
    dispatch(__editComment({ comments, commentsID }));
    setEdit(false);
  };

  const onDelCommentHandler = () => {
    const result = window.confirm("정말로 삭제하시겠습니까?");
    if (result) {
      console.log("comments", comment._id);
      dispatch(__deleteComment(comment._id));
    } else {
      return;
    }
  };

  return (
    <CommentBox key={comment.id}>
      {!isEdit ? (
        <>
          <CommentBody>{comment?.userId}</CommentBody>
          <CommentBody>{comment?.comment}</CommentBody>
          <button onClick={() => setEdit(true)}>수정</button>
        </>
      ) : (
        <>
          <StText
            placeholder="수정할 댓글내용을 입력하세요"
            value={comments.comment}
            onChange={(e) => {
              setComments(e.target.value);
            }}
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
