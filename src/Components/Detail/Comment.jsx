import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  __deleteComment,
  __editComment,
} from "../../redux/modules/CommentsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Comments = ({ comments }) => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);

  const commentId = comments._id;

  const initialState = {
    comment: "",
  };
  const [comment, setComment] = useState(initialState);

  //console.log("commentes", comment);

  const editCancel = () => {
    setComment(initialState);
    setEdit(false);
  };

  const onEditHandler = () => {
    console.log(comment);
    if (comment.comment === "") {
      alert("수정할 내용을 입력해주세요");
    } else {
      dispatch(__editComment({ comment, commentId }));
      setComment(initialState);
      setEdit(false);
    }
    // console.log("comment", comment);
    // console.log(commentId);
    // dispatch(__editComment({ comment, commentId }));
    // setEdit(false);
  };

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
    <CommentBox key={comment._id}>
      {!isEdit ? (
        <>
          <CommentBody>{comments?.nickName}</CommentBody>
          <CommentBody>{comments?.comment}</CommentBody>
          <Sticon>
            <FontAwesomeIcon
              style={{
                color: "#919191",
              }}
              size="2x"
              icon={faPenToSquare}
              cursor="pointer"
              onClick={() => setEdit(true)}
            />
            <FontAwesomeIcon
              style={{
                color: "#919191",
              }}
              size="2x"
              icon={faTrashCan}
              cursor="pointer"
              onClick={() => onDelCommentHandler(comment.id)}
            />
          </Sticon>
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
          <FontAwesomeIcon
            style={{
              color: "#919191",
            }}
            size="2x"
            icon={faCircleCheck}
            onClick={() => onEditHandler(comment.id)}
            cursor="pointer"
          />
          <FontAwesomeIcon
            style={{
              color: "#919191",
            }}
            size="2x"
            icon={faXmark}
            onClick={editCancel}
            cursor="pointer"
          />
        </>
      )}
    </CommentBox>
  );
};

export default Comments;

const CommentBox = styled.div`
  margin: 20px 5px 0px 5px;
  display: flex;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  padding: 10px 20px 0 20px;
  height: 100%;
`;

const CommentBody = styled.div`
  font-size: 20px;
  width: 100%;
  height: 100%;
`;

const StText = styled.input`
  height: 100%;
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid;
  border-color: transparent transparent #d7d7d7 transparent;
  :focus {
    outline: none;
  }
`;
const Sticon = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 5px;
`;
