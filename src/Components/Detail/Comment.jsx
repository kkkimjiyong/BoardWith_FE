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
import { useNavigate } from "react-router-dom";
import ProfileAvatarBox from "../Avatar/ProfileAvatarBox";

const Comments = ({
  comments,
  nickName,
  isHost,
  postid,
  detail,
  isPostEdit,
  ModalOpen,
  setModalOpen,
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [isBanUser, setIsBanUser] = useState(false);
  const navigate = useNavigate();
  const [isPartyAccept, setIsPartyAccept] = useState(false);

  const commentId = comments._id;
  //console.log("nickName", nickName);

  const initialState = {
    comment: "",
  };
  const [comment, setComment] = useState(initialState);
  // console.log("comment", comments);
  // console.log("detail", detail);

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
      alert("수정을 완료하였습니다.");
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
      setModalOpen((ModalOpen) => !ModalOpen);
      alert("참여 신청을 취소했습니다.");
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
        if (isPartyAccept === false) {
          setIsPartyAccept(true);
          alert("참가를 수락하였습니다.");
        } else {
          setIsPartyAccept(false);
          alert("참가 수락을 취소하였습니다.");
        }

        // setModalOpen(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("로그인이 필요합니다.");
        }
      });
  };
  // console.log("confirmMember", detail.confirmMember[0]);

  //파티원 강퇴 핸들러------------------------------------------------------------
  // console.log("comments", comments);
  const kickPartyHandler = () => {
    const nickName = { nickName: comments.nickName };
    console.log("nickName", nickName);
    const result = window.confirm(
      "이 파티원을 파티에서 강제퇴장시키시겠습니다?"
    );
    if (result) {
      postApi
        .kickingParty({ postid: postid, nickName: nickName })
        .then((res) => {
          alert("파티원을 강제퇴장시켰습니다.");
          console.log("성공", res);
          setIsBanUser(true);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert("로그인이 필요합니다.");
          }
          console.log("에러", error.response.status);
        });
    }
  };
  //파티원 강퇴 취소 핸들러------------------------------------------------------------

  const kickPartyCancelHandler = () => {
    const nickName = { nickName: comments.nickName };
    console.log("nickName", nickName);
    postApi
      .kickingPartyCancel({ postid: postid, nickName: nickName })
      .then((res) => {
        alert("파티원 강제퇴장을 취소했습니다.");
        console.log("성공", res);
        setIsBanUser(false);
      })
      .catch((error) => {
        console.log("에러", error);
      });
  };

  console.log("comments", comments);

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
  }, [comments, setIsPartyAccept]);
  // console.log("detail", detail);
  // console.log("comments", comments);
  // console.log("myPlace", comments?.myPlace);
  // console.log(comments?.myPlace.length === 0);
  console.log("isPartyAccept", isPartyAccept);

  return (
    <>
      {/* 강퇴 당한 유저가 아니라면 */}
      {!isBanUser ? (
        <>
          <CommentBox key={comment._id}>
            {/* 편집버튼을 누르지 않았다면 */}
            {!isEdit ? (
              <StCommentBodyWrap>
                <div>
                  <div>
                    <StAvatar
                      onClick={() =>
                        navigate(`/userpage/${comments?.nickName}`)
                      }
                    >
                      <ProfileAvatarBox
                        userSelect={{
                          Eye: comment?.userAvater?.Eye,
                          Hair: comment?.userAvater?.Hair,
                          Mouth: comment?.userAvater?.Mouth,
                          Back: comment?.userAvater?.Back,
                        }}
                      />
                    </StAvatar>
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
                        {comments?.myPlace.length !== 0 && (
                          <span>&nbsp;/&nbsp;{comments?.myPlace[0]}</span>
                        )}
                      </Stspan>
                      <div style={{ height: "6px" }} />
                      <Stspan style={{ fontSize: "20px" }}>
                        {comments?.comment}
                      </Stspan>
                    </StCommentBody>
                  </div>
                </div>
                {/* 파티장이라면 (글작성자) */}
                {isHost && (
                  <>
                    {/* 게시글의 편집버튼을 누르면 */}
                    {isPostEdit ? (
                      <StButton2 onClick={kickPartyHandler}>강퇴</StButton2>
                    ) : (
                      <StButton onClick={acceptingPartyHandler}>
                        {/* 파티에 확정을 받았다면 / 받지않았다면 */}
                        {isPartyAccept ? "취소" : "수락"}
                      </StButton>
                    )}
                  </>
                )}
                {/* 접속자 닉네임과 댓글작성자 닉네임이 같으면 */}
                {nickName === comments?.nickName && (
                  <Sticon>
                    <FontAwesomeIcon
                      style={{
                        color: "white",
                      }}
                      size="lg"
                      icon={faPenToSquare}
                      cursor="pointer"
                      onClick={() => setEdit(true)}
                    />
                    <FontAwesomeIcon
                      style={{
                        color: "white",
                      }}
                      size="lg"
                      icon={faTrashCan}
                      cursor="pointer"
                      onClick={() => onDelCommentHandler(comment.id)}
                    />
                  </Sticon>
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
                    color: "var(--primary)",
                    marginRight: "5px",
                  }}
                  size="lg"
                  icon={faCircleCheck}
                  onClick={() => onEditHandler(comment.id)}
                  cursor="pointer"
                />
                <FontAwesomeIcon
                  style={{
                    color: "var(--primary)",
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
          {isPostEdit && (
            <>
              {!isBanUser && (
                <>
                  <CommentBox key={comment._id}>
                    <StCommentBodyWrap>
                      <div>
                        <div>
                          <StAvatar>
                            <ProfileAvatarBox
                              userSelect={{
                                Eye: comment?.userAvater?.Eye,
                                Hair: comment?.userAvater?.Hair,
                                Mouth: comment?.userAvater?.Mouth,
                                Back: comment?.userAvater?.Back,
                              }}
                            />
                          </StAvatar>
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
                              {comments?.myPlace.length !== 0 && (
                                <span>&nbsp;/&nbsp;{comments?.myPlace[0]}</span>
                              )}
                            </Stspan>
                            <div style={{ height: "6px" }} />
                            <Stspan style={{ fontSize: "20px" }}>
                              {comments?.comment}
                            </Stspan>
                          </StCommentBody>
                        </div>
                      </div>
                      <StBanButton onClick={kickPartyCancelHandler}>
                        {isPostEdit && "취소"}
                      </StBanButton>
                    </StCommentBodyWrap>
                  </CommentBox>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Comments;

const StButton = styled.button`
  background-color: var(--primary);
  width: 80px;
  height: 50px;
  border-radius: 15px;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  color: white;
  border: none;
  &:active {
    scale: 95%;
  }
`;

const StButton2 = styled.button`
  background-color: var(--primary);
  width: 80px;
  height: 50px;
  border-radius: 15px;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  color: var(--black);
  border: none;
  &:active {
    scale: 95%;
  }
`;

const StBanButton = styled.button`
  background-color: var(--primary);
  width: 80px;
  height: 50px;
  border-radius: 15px;
  border: none;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  color: white;
  &:active {
    scale: 95%;
  }
`;

const CommentBox = styled.div`
  margin: 3% 3%;
  display: flex;
  /* border: 2px solid var(--primary); */
  border-radius: 10px;
  padding: 2% 3% 2% 0;
  height: 100%;
  background-color: #343434;
  border: none;
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
  max-width: 100%;
`;

const Stspan = styled.span`
  display: flex;
  font-size: 15px;
  width: 100%;
  text-align: center;
  align-items: center;
  font-size: 14px;
`;

const StText = styled.input`
  color: white;
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

const StAvatar = styled.div`
  display: flex;
  border: 1px solid gray;
  margin: 20px;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;
