import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { io } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  // const socket = io("https://www.iceflower.shop/");
  const socket = io("https://www.iceflower.shop/");
  const [message, setMessage, onChange] = useInput();
  const [name, setName] = useState("qwqwqw");
  const [users, setUsers] = useState([
    { nickName: 123 },
    { nickName: 123 },
    { nickName: 123 },
    { nickName: 123 },
    { nickName: 123 },
  ]);
  const [isEdit, SetisEdit] = useState(false);
  const scrollRef = useRef();
  useEffect(() => {
    // 현재 스크롤 위치 === scrollRef.current.scrollTop
    // 스크롤 길이 === scrollRef.current.scrollHeight
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });
  const [chatArr, setChatArr] = useState([]);

  const onSubmitHandler = (e) => {
    socket.emit("chatMessage", {
      nickName: name,
      message: message.message,
      room: "123",
    });
    // e.preventDefault();
    console.log(chatArr);
    console.log("chatMessage", {
      nickName: name,
      message: message.message,
      room: "123",
    });
  };

  const roomsubmit = () => {
    socket.emit("joinRoom", {
      nickName: name,
      room: localStorage.getItem("Room"),
    });
    console.log("입장", localStorage.getItem("Room"));
  };

  const ban = (user) => {
    socket.emit("ban", user);
    console.log("ban", user);
  };
  const naviate = useNavigate();
  const exithandler = () => {
    localStorage.removeItem("Room");
    naviate("/");
  };

  useEffect(() => {
    console.log("render!");
    roomsubmit();
    // socket.emit("joinRoom", { username: 여기에 유저아이디가 들어가야할듯 , room: 여기에는 포스트아이디 });
    socket.on("roomUsers", (msg) => {
      console.log("룸유저들을 받음", msg);
      setUsers(msg.users);
    });

    socket.on("message", (message) => {
      console.log("메세지를 받음", message);
      console.log(chatArr);
      setChatArr((chatArr) => [...chatArr, message]);
    });
    socket.on("disconnect", (msg) => {
      console.log("disconnect 받음", msg);
    });
  }, []);
  return (
    <>
      <Wrapper>
        <ChatHeader>
          <ExitBtn onClick={() => exithandler()}>나가기</ExitBtn>
          <div>방제목</div>
          <div onClick={() => SetisEdit(!isEdit)}>
            <UserBtn>유저정보보기</UserBtn>
            {isEdit && (
              <UserList>
                {users?.map((user) => {
                  return (
                    <UserBox>
                      <div>{user.nickName}</div>
                      <button
                        onClick={() => {
                          ban(user.nickName);
                        }}
                      >
                        밴
                      </button>
                    </UserBox>
                  );
                })}
              </UserList>
            )}
          </div>
        </ChatHeader>
        <ChatCtn ref={scrollRef}>
          {chatArr.map((chat) => {
            return <ChatMessage name={name} chat={chat} />;
          })}
        </ChatCtn>{" "}
        <ChatInputBox>
          <ChatInput name="message" onChange={onChange} />
          <ChatBtn onClick={() => onSubmitHandler()}>전송</ChatBtn>
        </ChatInputBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ChatHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const ExitBtn = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0px 3px 3px 0px gray;
`;

const UserBtn = styled.div`
  cursor: pointer;
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
  padding: 10px;
  position: absolute;
  top: 7%;
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 2px solid #be8eff;
  gap: 10px;
  background-color: #be8eff;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ChatRoom;
