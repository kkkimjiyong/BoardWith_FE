import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { io } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FireNotification from "../../tools/useNotification";
import { userApi } from "../../instance";
import { setCookie } from "../../hooks/CookieHook";
import { postApi } from "../../instance";
import moment from "moment-timezone";
import "moment/locale/ko";

const ChatRoom = () => {
  // const socket = io("https://www.iceflower.shop/");
  const socket = io("https://www.iceflower.shop/");
  //웹소켓으로만 통신하고싶을때
  // {
  //   transports: ["websocket"],
  // }

  const [message, setMessage, onChange] = useInput();
  const [notice, setNotice] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEdit, SetisEdit] = useState(false);
  const scrollRef = useRef();
  const [chatArr, setChatArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [detail, setDetail] = useState();
  const [roomInfo, setRoomInfo] = useState(
    JSON.parse(localStorage.getItem("Room"))
  );

  const moment = require("moment-timezone");
  const getStartTime = (startDate) => {
    var m = moment(startDate).tz("Asia/Seoul").locale("ko");
    return m.format("MM.DD (ddd) HH:mm");
  };
  const RoomTime = getStartTime(detail?.time[0]);

  // axios로 채팅db가져오기
  const getChat = async () => {
    try {
      const { data } = await axios.get(
        `https://www.iceflower.shop/chats/${roomInfo.roomid}`
      );
      if (data.updateSocket.chat) setChatArr(data.updateSocket.chat);
    } catch (error) {}
  };
  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);
      if (data.myNewToken) {
        setCookie("accessToken", data.myNewToken);
        setUser(data.findUser);
      } else {
        setUser(data.findUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getChat();
    postApi.getDetailId(roomInfo.roomid).then((res) => {
      setDetail(res.data.data);
    });
  }, []);

  //채팅이 갱신될때마다 맨 밑으로 내리기
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatArr]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    socket.emit("chatMessage", {
      nickName: user.nickName,
      message: message.message,
      room: roomInfo.roomid,
    });

    setMessage({ message: "" });
  };

  const roomsubmit = () => {
    socket.emit("joinRoom", {
      nickName: user?.nickName,
      room: roomInfo.roomid,
    });
  };

  const ban = (user) => {
    socket.emit("ban", {
      nickName: user.nickName,
      room: roomInfo.roomid,
    });
  };

  const navigate = useNavigate();
  const exithandler = () => {
    socket.emit("leave-room", {
      nickName: user.nickName,
      room: roomInfo.roomid,
    });

    navigate(`/posts/${roomInfo.roomid}`);
  };

  useEffect(() => {
    console.log("render!");
    roomsubmit();
    // socket.emit("joinRoom", { username: 여기에 유저아이디가 들어가야할듯 , room: 여기에는 포스트아이디 });
    socket.on("roomUsers", (msg) => {
      setUsers(msg.nickName);
    });

    socket.on("message", (message) => {
      setChatArr((chatArr) => [...chatArr, message]);
    });
    socket.on("disconnect", (msg) => {});
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
          <Arrow className="left" onClick={() => exithandler()}></Arrow>
          <div>{roomInfo.roomname}</div>
          <div onClick={() => SetisEdit(!isEdit)}>
            <UserBtn>유저</UserBtn>
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
        </ChatHeader>{" "}
        <RoomInfoHeader onClick={() => setIsOpen(!isOpen)}>
          <div> 파티 정보</div> <Arrow className={isOpen && "UpArrow"} />
        </RoomInfoHeader>
        {isOpen && (
          <RoomInfo>
            <>
              <RoomBox>
                {" "}
                <RoomBoxTitle>
                  {" "}
                  <div>주최자</div>
                  <div>장소</div>
                  <div>일자</div>
                </RoomBoxTitle>
                <div>
                  <div>{detail?.nickName} 님</div>
                  <div>{detail?.cafe}</div>
                  <div>{RoomTime}</div>
                </div>
              </RoomBox>

              <RoomBtn onClick={() => setIsOpen(false)}>접어두기</RoomBtn>
            </>
          </RoomInfo>
        )}
        <ChatCtn>
          {chatArr?.map((chat) => {
            return <ChatMessage name={user?.nickName} chat={chat} />;
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
  height: 6%;
`;

const RoomInfo = styled.div`
  position: absolute;
  top: 9%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 10px 20px;
  background-color: #ddd;
  gap: 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const RoomInfoHeader = styled.div`
  z-index: 10;
  display: flex;
  position: absolute;
  width: 100%;
  top: 6%;
  height: 5%;
  align-items: center;
  justify-content: space-between;
  background-color: #ddd;
  padding: 0px 40px;
  border-radius: 15px;
`;

const RoomBox = styled.div`
  display: flex;
  gap: 20px;
`;
const RoomBoxTitle = styled.div`
  margin-left: 20px;
`;

const RoomBtn = styled.div`
  width: 100%;
  border-radius: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Arrow = styled.div`
  display: inline-block;
  border: 10px solid transparent;
  border-top-color: black;
  margin-top: 12px;
  &.left {
    transform: rotate(90deg);
  }
  &.UpArrow {
    transform: rotate(180deg);
    margin-bottom: 25px;
  }
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
