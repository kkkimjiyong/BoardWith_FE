import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { io } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FireNotification from "../../tools/useNotification";

const ChatRoom = () => {
  // const socket = io("https://www.iceflower.shop/");
  const socket = io("https://www.iceflower.shop/");
  //웹소켓으로만 통신하고싶을때
  // {
  //   transports: ["websocket"],
  // }
  const [message, setMessage, onChange] = useInput();
  const [name, setName] = useState("수");
  const [notice, setNotice] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEdit, SetisEdit] = useState(false);
  const scrollRef = useRef();
  const [chatArr, setChatArr] = useState([]);

  // axios로 채팅db가져오기
  const getChat = async () => {
    try {
      const { data } = await axios.get(
        `https://www.iceflower.shop/chats/${
          JSON.parse(localStorage.getItem("Room")).roomid
        }`
      );
      console.log(data.updateSocket.chat);
      if (data.updateSocket.chat) setChatArr(data.updateSocket.chat);
    } catch (error) {}
  };

  useEffect(() => {
    getChat();
  }, []);

  //채팅이 갱신될때마다 맨 밑으로 내리기
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatArr]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    socket.emit("chatMessage", {
      nickName: name,
      message: message.message,
      room: JSON.parse(localStorage.getItem("Room")).roomid,
    });
    console.log("chatMessage", {
      nickName: name,
      message: message.message,
      room: JSON.parse(localStorage.getItem("Room")).roomid,
    });
    setMessage({ message: "" });
  };

  const roomsubmit = () => {
    socket.emit("joinRoom", {
      nickName: name,
      room: JSON.parse(localStorage.getItem("Room")).roomid,
    });
    console.log("입장", JSON.parse(localStorage.getItem("Room")).roomid);
  };

  const ban = (user) => {
    socket.emit("ban", {
      nickName: user,
      room: JSON.parse(localStorage.getItem("Room")).roomid,
    });
    console.log("ban", {
      nickName: user,
      room: JSON.parse(localStorage.getItem("Room")).roomid,
    });
  };

  const navigate = useNavigate();
  const exithandler = () => {
    socket.emit("leave-room", {
      nickName: name,
      room: JSON.parse(localStorage.getItem("Room")).roomid,
    });
    console.log("leave-room", {
      nickName: name,
      room: JSON.parse(localStorage.getItem("Room")).roomid,
    });
    navigate(`/posts/${JSON.parse(localStorage.getItem("Room")).roomid}`);
  };
  console.log(chatArr);

  useEffect(() => {
    console.log("render!");
    // roomsubmit();
    // socket.emit("joinRoom", { username: 여기에 유저아이디가 들어가야할듯 , room: 여기에는 포스트아이디 });
    socket.on("roomUsers", (msg) => {
      console.log("룸유저들을 받음", msg);
      setUsers(msg.nickName);
      console.log(msg.nickName);
    });

    socket.on("message", (message) => {
      console.log("메세지를 받음", message);
      console.log(chatArr);
      setChatArr((chatArr) => [...chatArr, message]);
    });
    socket.on("disconnect", (msg) => {
      console.log("disconnect 받음", msg);
    });
    socket.on("notice", (msg) => {
      console.log("서버에서의 notice", msg);
      FireNotification("서버에서의 notice", {
        body: msg,
      });
    });
  }, []);
  return (
    <>
      <Wrapper>
        <ChatHeader>
          <Arrow onClick={() => exithandler()}></Arrow>
          <div>{JSON.parse(localStorage.getItem("Room")).roomname}</div>
          <div onClick={() => SetisEdit(!isEdit)}>
            <UserBtn>유저정보보기</UserBtn>
            {isEdit && (
              <UserList>
                {users?.map((user) => {
                  return (
                    <UserBox>
                      <div>{user}</div>
                      <button
                        onClick={() => {
                          ban(user);
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
        <ChatCtn>
          {chatArr?.map((chat) => {
            return <ChatMessage name={name} chat={chat} />;
          })}
          <div style={{ height: "0px" }} ref={scrollRef} />
        </ChatCtn>{" "}
        <ChatInputBox onSubmit={onSubmitHandler}>
          <ChatInput
            value={message?.message}
            name="message"
            onChange={onChange}
          />
          <ChatBtn>전송</ChatBtn>
        </ChatInputBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Arrow = styled.div`
  display: inline-block;
  border: 10px solid transparent;
  border-top-color: black;
  transform: rotate(90deg);
`;

const UserBtn = styled.div`
  cursor: pointer;
`;

const ChatCtn = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

const ChatInputBox = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  gap: 20px;
  background-color: #ddd;
`;

const ChatInput = styled.input`
  border: none;
  border-radius: 20px;
  width: 70%;
  height: 40px;
  background-color: #be8eff;
  margin: 0 auto;
`;

const ChatBtn = styled.button`
  position: absolute;
  right: 15%;
  width: 10%;
  height: 40px;
  border: none;
  border-radius: 100%;
  box-shadow: 0px 3px 3px 0px gray;
`;

const UserList = styled.div`
  padding: 10px;
  position: absolute;
  top: 4%;
  right: 5%;
  height: 30%;
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  border: 2px solid #be8eff;
  gap: 10px;
  background-color: #be8eff;
`;

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export default ChatRoom;
