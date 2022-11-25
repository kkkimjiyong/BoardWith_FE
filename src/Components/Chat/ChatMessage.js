import React from "react";
import styled from "styled-components";

const ChatMessage = ({ chat, name }) => {
  return (
    //내가 아닌 상대가 보냈을 때, 익명이라는 클래스네임 부여
    <ChatCtn className={chat.nickName !== name && "anonymous"}>
      <ChatProfile>
        <ProfileBox></ProfileBox>
      </ChatProfile>{" "}
      <ChatBox>
        <ChatNickName>{chat.nickName}</ChatNickName>{" "}
        <ChatMessageBox>{chat.message}</ChatMessageBox>
      </ChatBox>
    </ChatCtn>
  );
};

const ChatCtn = styled.div`
  color: #dddddd;
  width: 100%;
  height: 13%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  align-items: flex-end;
  //내가 아닌 상대가 보냈을 때
  &.anonymous {
    flex-direction: row;
    /* background-color: red; */
  }
`;

const ChatBox = styled.div`
  height: 80%;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const ChatNickName = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: flex-start;
`;

const ChatMessageBox = styled.div`
  background-color: var(--gray);
  border-radius: 10px;
  padding: 5px 20px;
`;

const ChatProfile = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: #dddddd;
  border-radius: 10px;
`;

export default ChatMessage;
