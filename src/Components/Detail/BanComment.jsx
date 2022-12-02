import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postApi } from "../../instance";
import { useNavigate } from "react-router-dom";
import AvatarBox from "../Avatar/AvatarBox";

const BanComments = ({
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

  // console.log("comments", comments);

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

  console.log(comments);

  return (
    <>
      {/* 강퇴 당한 유저가 아니라면 */}
      {isPostEdit && (
        <>
          {isBanUser && (
            <>
              <CommentBox key={comment._id}>
                <StCommentBodyWrap>
                  <div>
                    <div>
                      <StAvatar>
                        <AvatarBox
                          profile={true}
                          scale={0.2}
                          backScale={0.8}
                          circle={true}
                          userSelect={{
                            Eye: comments?.userAvatar?.Eye,
                            Hair: comments?.userAvatar?.Hair,
                            Mouth: comments?.userAvatar?.Mouth,
                            Back: comments?.userAvatar?.Back,
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

                  <StCancelButton onClick={kickPartyCancelHandler}>
                    복구
                  </StCancelButton>
                </StCommentBodyWrap>
              </CommentBox>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BanComments;

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
const StCancelButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: 2px solid var(--primary);
  width: 90px;
  height: 65px;
  border-radius: 15px;
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  color: var(--primary);
  &:active {
    scale: 95%;
  }
`;
