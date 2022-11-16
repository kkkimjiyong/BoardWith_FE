import React from "react";
import styled from "styled-components";

const ChatMessage = ({ chat, name }) => {
  return (
    //내가 아닌 상대가 보냈을 때, 익명이라는 클래스네임 부여
    <ChatCtn className={chat.nickName !== name && "anonymous"}>
      <ChatProfile>
        <ProfileBox></ProfileBox>
        <div>{chat.nickName}</div>
      </ChatProfile>
      <ChatBox>
        <div>{chat.message}</div>
      </ChatBox>
    </ChatCtn>
  );
};

const ChatCtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  //내가 아닌 상대가 보냈을 때
  &.anonymous {
    flex-direction: row-reverse;
  }
`;

const ChatBox = styled.div`
  height: 100%;
  border: 2px solid #be8eff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ChatProfile = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ProfileBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: #be8eff;
  border-radius: 10px;
`;

export default ChatMessage;
