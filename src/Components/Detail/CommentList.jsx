import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  __getComments,
  __postComments,
} from "../../redux/modules/CommentsSlice";
import Comments from "./Comment";

const CommentList = () => {
  const { postid } = useParams();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const initialState = {
    comment: "",
  };
  const [comment, setComment] = useState(initialState);

  const { comments } = useSelector((state) => state.comments.comments);
  //console.log("코멘트리스트", comments);
  useEffect(() => {
    dispatch(__getComments(postid));
  }, [dispatch]);

  //console.log(comment);
  const commentOnsumitHandler = () => {
    dispatch(__postComments({ comment, postid }));
    //console.log("DB에 넣고 여기 탐");
    // dispatch(__getComments(postid));
    setComment(initialState);
  };

  return (
    <>
      <Wrap open={open}>
        <div
          className="innerDiv"
          onClick={() => {
            setOpen((open) => !open);
          }}
        >
          {open ? "눌러서 댓글 내리기👇" : "눌러서 댓글 보기👇"}
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
          {comments?.map((comment) => {
            //console.log("map", comment.comment);
            return <Comments key={comment.id} comment={comment} />;
          })}

          {/* {comments.map((comment) => (
            <div key={comment.id}>
              <Comments comment={comment} /> : null}
            </div>
          ))} */}
        </div>
      </Wrap>
    </>
  );
};

export default CommentList;

const Wrap = styled.div`
  width: 100%;
  background-color: white;
  height: ${({ open }) => (open ? "500px" : "30px")};
  position: absolute;
  bottom: 0;
  left: 0;
  transition: height 400ms ease-in-out;
  .innerDiv {
    position: fixed;
    width: 100%;
    background-color: salmon;
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
    justify-content: space-evenly;
  }
  input {
    border: 2px solid salmon;
    border-radius: 5px;
    height: 40px;
    width: 400px;
    padding: 0;
  }
  input:nth-child(2) {
    width: 400px;
  }
  input:focus {
    outline: none;
  }
  button {
    padding: 0;
    width: 200px;
    height: 40px;
    background-color: salmon;
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
