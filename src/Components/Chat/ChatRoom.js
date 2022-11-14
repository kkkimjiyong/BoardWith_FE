import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { io } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";

const ChatRoom = () => {
  const socket = io("https://www.iceflower.shop/");
  const [message, setMessage, onChange] = useInput();
  const [name, setName] = useState("김지용");
  const [users, setUsers] = useState([
    { nickName: "안녕" },
    { nickName: "안녕" },
    { nickName: "안녕" },
    { nickName: "안녕" },
  ]);
  const [roomname, setRoomname] = useState();
  const scrollRef = useRef();
  useEffect(() => {
    // 현재 스크롤 위치 === scrollRef.current.scrollTop
    // 스크롤 길이 === scrollRef.current.scrollHeight
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });
  const [chatArr, setChatArr] = useState([]);

  const onSubmitHandler = (e) => {
    socket.emit("chatMessage", { nickName: name, message: message.message });
    // e.preventDefault();
    console.log(chatArr);
    console.log("chatMessage", { nickName: name, message: message.message });
  };

  const roomsubmit = () => {
    socket.emit("joinRoom", { nickName: name, room: roomname });
    console.log("joinRoom", { nickName: name, room: roomname });
  };

  const namesubmit = () => {
    socket.emit("joinRoom", { nickName: name, room: roomname });
    console.log("joinRoom", { nickName: name, room: roomname });
  };

  const ban = (user) => {
    socket.emit("ban", user);
    console.log("ban", user);
  };

  useEffect(() => {
    // socket.emit("joinRoom", { username: 여기에 유저아이디가 들어가야할듯 , room: 여기에는 포스트아이디 });
    socket.on("roomUsers", (msg) => {
      console.log("룸유저들을 받음", msg);
      setUsers(msg.users);
    });
    console.log();
    socket.on("message", (message) => {
      console.log("메세지를 받음", message);
      console.log(chatArr);
      setChatArr((chatArr) => [...chatArr, message]);
    });
  }, []);
  console.log(chatArr);
  return (
    <>
      <Wrapper>
        <ChatCtn ref={scrollRef}>
          {chatArr.map((chat) => {
            return <ChatMessage name={name} chat={chat} />;
          })}
        </ChatCtn>{" "}
        <ChatInputBox>
          메세지
          <ChatInput name="message" onChange={onChange} />
          <ChatBtn onClick={() => onSubmitHandler()}>전송</ChatBtn>
        </ChatInputBox>
        <ChatInputBox>
          닉네임
          <ChatInput onChange={(e) => setName(e.target.value)} />
          <ChatBtn onClick={() => namesubmit()}>전송</ChatBtn>
        </ChatInputBox>{" "}
        <ChatInputBox>
          룸네임
          <ChatInput onChange={(e) => setRoomname(e.target.value)} />
          <ChatBtn onClick={() => roomsubmit()}>입장</ChatBtn>
        </ChatInputBox>
      </Wrapper>
      <UserList>
        {users?.map((user) => {
          return (
            <>
              <div>{user.nickName}</div>
              <button
                onClick={() => {
                  ban(user.nickName);
                }}
              >
                밴
              </button>
            </>
          );
        })}
      </UserList>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatCtn = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #be8eff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  padding: 20px 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

const ChatInputBox = styled.div`
  display: flex;
  gap: 20px;
`;

const ChatInput = styled.input`
  border: none;
  border-radius: 20px;
  width: 70%;
  height: 60px;
  background-color: #be8eff;
  margin: 0 auto;
`;

const ChatBtn = styled.button`
  width: 10%;
  height: 60px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 3px 3px 0px gray;
`;

const UserList = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
`;

export default ChatRoom;
