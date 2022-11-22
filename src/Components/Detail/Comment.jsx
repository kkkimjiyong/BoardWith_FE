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
import { postApi } from "../../instance";

const Comments = ({
  comments,
  nickName,
  isHost,
  postid,
  detail,
  isPostEdit,
}) => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [isPartyAccept, setIsPartyAccept] = useState(false);
  const [isBanUser, setIsBanUser] = useState(false);

  const commentId = comments._id;
  //console.log("nickName", nickName);

  const initialState = {
    comment: "",
  };
  const [comment, setComment] = useState(initialState);
  // console.log("comment", comments);

  //댓글 수정 취소--------------------------------------------------------------
  const editCancel = () => {
    setComment(initialState);
    setEdit(false);
  };

  //댓글 수정 핸들러--------------------------------------------------------------
  const onEditHandler = () => {
    // console.log("comment", comment);
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

  //댓글 삭제 핸들러-------------------------------------------------------------
  const onDelCommentHandler = () => {
    const result = window.confirm(
      "삭제하시면 참여 신청이 취소됩니다.\n정말로 삭제하시겠습니까?"
    );
    if (result) {
      console.log("comments", comments._id);
      dispatch(__deleteComment(comments._id));
    } else {
      return;
    }
  };

  //파티원 수락 핸들러------------------------------------------------------------
  // console.log("comments", comments);
  const acceptingPartyHandler = () => {
    const nickName = { nickName: comments.nickName };
    console.log("nickName", nickName);
    postApi
      .acceptingParty({ postid: postid, nickName: nickName })
      .then((res) => {
        console.log("성공", res);
        setIsPartyAccept(true);
      })
      .catch((error) => {
        console.log("에러", error);
      });
  };
  // console.log("confirmMember", detail.confirmMember[0]);

  //파티원 강퇴 핸들러------------------------------------------------------------
  // console.log("comments", comments);
  const kickPartyHandler = () => {
    const nickName = { nickName: comments.nickName };
    console.log("nickName", nickName);
    postApi
      .kickingParty({ postid: postid, nickName: nickName })
      .then((res) => {
        console.log("성공", res);
        setIsBanUser(true);
      })
      .catch((error) => {
        console.log("에러", error);
      });
  };
  //파티원 강퇴 취소 핸들러------------------------------------------------------------
  // console.log("comments", comments);
  const kickPartyCancelHandler = () => {
    const nickName = { nickName: comments.nickName };
    console.log("nickName", nickName);
    postApi
      .kickingPartyCancel({ postid: postid, nickName: nickName })
      .then((res) => {
        console.log("성공", res);
        setIsBanUser(false);
      })
      .catch((error) => {
        console.log("에러", error);
      });
  };

  // console.log("detail", detail);

  useEffect(() => {
    //참가 확정 받은 유저인지 비교
    for (let i = 0; i < detail?.confirmMember?.length; i++)
      if (comments?.nickName === detail?.confirmMember[i]) {
        setIsPartyAccept(true);
      } else {
        setIsPartyAccept(false);
      }
    //밴 유저인지 비교
    for (let i = 0; i < detail?.banUser?.length; i++)
      if (comments?.nickName === detail?.banUser[i]) {
        setIsBanUser(true);
        console.log("isBanUser", isBanUser);
      } else {
        setIsBanUser(false);
      }
  });
  // console.log("isEdit", isEdit);

  return (
    <>
      {!isBanUser ? (
        <>
          <CommentBox key={comment._id}>
            {!isEdit ? (
              <StCommentBodyWrap>
                <div>
                  <div>
                    <div
                      style={{
                        border: "1px solid gray",
                        margin: "20px",
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        backgroundColor: "white",
                        // backgroundImage: `url(${detail?.data?.img})`,
                        backgroundSize: "cover",
                        backgroundImage: `url(https://r1.community.samsung.com/t5/image/serverpage/image-id/2304962i2F7C66D1874B9309/image-size/large?v=v2&px=999)`,
                      }}
                    />
                  </div>
                  <div>
                    <StCommentBody>
                      <Stspan
                        style={{
                          fontSize: "17px",
                        }}
                      >
                        {comments?.nickName}
                      </Stspan>
                      <Stspan>
                        <span>20대</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{comments?.gender}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{comments?.myPlace}</span>
                      </Stspan>
                      <div style={{ height: "6px" }} />
                      <Stspan style={{ fontSize: "20px" }}>
                        {comments?.comment}
                      </Stspan>
                    </StCommentBody>
                  </div>
                </div>
                {isHost && !isPartyAccept ? (
                  <StButton onClick={acceptingPartyHandler}>수락</StButton>
                ) : (
                  <></>
                )}
                {isHost && isPostEdit ? (
                  <StButton2 onClick={kickPartyHandler}>강퇴</StButton2>
                ) : (
                  <></>
                )}
                {nickName === comments?.nickName ? (
                  <Sticon>
                    <FontAwesomeIcon
                      style={{
                        color: "#919191",
                      }}
                      size="lg"
                      icon={faPenToSquare}
                      cursor="pointer"
                      onClick={() => setEdit(true)}
                    />
                    <FontAwesomeIcon
                      style={{
                        color: "#919191",
                      }}
                      size="lg"
                      icon={faTrashCan}
                      cursor="pointer"
                      onClick={() => onDelCommentHandler(comment.id)}
                    />
                  </Sticon>
                ) : (
                  <></>
                )}
              </StCommentBodyWrap>
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
                ></StText>
                <FontAwesomeIcon
                  style={{
                    color: "#919191",
                    marginRight: "5px",
                  }}
                  size="lg"
                  icon={faCircleCheck}
                  onClick={() => onEditHandler(comment.id)}
                  cursor="pointer"
                />
                <FontAwesomeIcon
                  style={{
                    color: "#919191",
                    marginRight: "10px",
                  }}
                  size="lg"
                  icon={faXmark}
                  onClick={editCancel}
                  cursor="pointer"
                />
              </>
            )}
          </CommentBox>
        </>
      ) : (
        <>
          {isPostEdit ? (
            <CommentBox key={comment._id}>
              <StCommentBodyWrap>
                <div>
                  <div>
                    <div
                      style={{
                        border: "1px solid gray",
                        margin: "20px",
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        backgroundColor: "white",
                        // backgroundImage: `url(${detail?.data?.img})`,
                        backgroundSize: "cover",
                        backgroundImage: `url(https://r1.community.samsung.com/t5/image/serverpage/image-id/2304962i2F7C66D1874B9309/image-size/large?v=v2&px=999)`,
                      }}
                    />
                  </div>
                  <div>
                    <StCommentBody>
                      <Stspan
                        style={{
                          fontSize: "17px",
                        }}
                      >
                        {comments?.nickName}
                      </Stspan>
                      <Stspan>
                        <span>20대</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{comments?.gender}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{comments?.myPlace}</span>
                      </Stspan>
                      <div style={{ height: "6px" }} />
                      <Stspan style={{ fontSize: "20px" }}>
                        {comments?.comment}
                      </Stspan>
                    </StCommentBody>
                  </div>
                </div>
                <StBanButton onClick={kickPartyCancelHandler}>취소</StBanButton>
              </StCommentBodyWrap>
            </CommentBox>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Comments;

const StButton = styled.button`
  margin: 0 3% 0 0;
  width: 20%;
  height: 50px;
  border-radius: 15px;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  background-color: #a5d0ff;
  color: white;
  border: 1px solid white;
  &:active {
    scale: 95%;
  }
`;

const StButton2 = styled.button`
  width: 20%;
  height: 50px;
  border-radius: 15px;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  background-color: #ff6565;
  color: white;
  border: 1px solid white;
  &:active {
    scale: 95%;
  }
`;

const StBanButton = styled.button`
  width: 30%;
  height: 50px;
  border-radius: 15px;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  background-color: #ff6565;
  color: white;
  border: 1px solid white;
  &:active {
    scale: 95%;
  }
`;

const CommentBox = styled.div`
  margin: 3% 3%;
  display: flex;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  padding: 3% 0;
  height: 100%;
`;

const StCommentBodyWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    /* margin-right: 7%; */
  }
`;

const StCommentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Stspan = styled.span`
  display: flex;
  font-size: 15px;
  width: 100%;
  text-align: center;
  align-items: center;
`;

const StText = styled.input`
  height: 100%;
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid;
  border-color: transparent;
  :focus {
    outline: none;
  }
`;
const Sticon = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-right: 10px;
  gap: 5px;
`;
