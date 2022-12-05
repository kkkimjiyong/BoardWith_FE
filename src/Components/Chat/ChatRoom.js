import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { io } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FireNotification from "../../tools/useNotification";
import { userApi } from "../../instance";
import { setCookie } from "../../hooks/CookieHook";
import { postApi } from "../../instance";
import moment from "moment-timezone";
import "moment/locale/ko";
import { BiAlignRight } from "@react-icons/all-files/bi/BiAlignRight";
import { AiOutlineNotification } from "@react-icons/all-files/ai/AiOutlineNotification";
import { FaArrowAltCircleUp } from "@react-icons/all-files/fa/FaArrowAltCircleUp";
import AvatarBox from "../Avatar/AvatarBox";
import { GiSiren } from "@react-icons/all-files/gi/GiSiren";

const ChatRoom = () => {
  const socket = io(process.env.REACT_APP_BACK_SERVER);
  //웹소켓으로만 통신하고싶을때
  // {
  //   transports: ["websocket"],
  // }
  const { roomid } = useParams();
  const [message, setMessage, onChange] = useInput();
  const [notice, setNotice] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEdit, SetisEdit] = useState(false);
  const scrollRef = useRef();
  const [chatArr, setChatArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [detail, setDetail] = useState();

  const moment = require("moment-timezone");
  const getStartTime = (startDate) => {
    var m = moment(startDate).tz("Asia/Seoul").locale("ko");
    return m.format("MM.DD (ddd) HH:mm");
  };
  const RoomTime = getStartTime(detail?.time[0]);
  console.log(users[1]);
  console.log(users[0]);
  // axios로 채팅db가져오기
  const getChat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACK_SERVER}/${roomid}`
      );
      if (data.updateSocket.chat) setChatArr(data.updateSocket.chat);
    } catch (error) {}
  };
  const getUser = async () => {
    try {
      const { data } = await userApi.getUser();
      console.log(data);
      setUser(data.findUser);
      roomsubmit(data.findUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getChat();
    postApi.getDetailId(roomid).then((res) => {
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
      room: roomid,
    });
    setMessage({ message: "" });
  };

  const roomsubmit = (user) => {
    console.log(user?.nickName);
    socket.emit("joinRoom", {
      nickName: user?.nickName,
      room: roomid,
    });
  };

  const ban = (user) => {
    socket.emit("ban", {
      nickName: user,
      room: roomid,
    });
    console.log("ban", {
      nickName: user,
      room: roomid,
    });
  };

  console.log(users.map((user) => console.log(user)));

  const navigate = useNavigate();

  const exithandler = () => {
    socket.emit("leave-room", {
      nickName: user?.nickName,
      room: roomid,
    });
    socket.disconnect();
    navigate("/main");
  };

  useEffect(() => {
    console.log("render!");
    // socket.emit("joinRoom", { username: 여기에 유저아이디가 들어가야할듯 , room: 여기에는 포스트아이디 });

    socket.on("roomUsers", (msg) => {
      console.log("ddd", msg);
      setUsers(msg);
    });

    socket.on("message", (message) => {
      console.log(message);
      setChatArr((chatArr) => [...chatArr, message]);
    });
    socket.on("disconnect", (msg) => {
      console.log(msg);
    });
    socket.on("notice", (msg) => {
      console.log("서버에서의 notice", msg);
      alert(msg);
    });
    socket.on("banUsers", (msg) => {
      console.log("밴강퇴", msg, user?.nickName);
      if (msg == user?.nickName) {
        navigate("/main");
        socket.disconnect();
      }
    });
  }, [getUser]);

  return (
    <>
      <Wrapper>
        <UserWrap
          isEdit={isEdit}
          onClick={() => {
            SetisEdit(!isEdit);
          }}
        >
          {" "}
          <UserCtn onClick={(e) => e.stopPropagation()} isEdit={isEdit}>
            <DrawerHead>{detail?.title}</DrawerHead>
            {users?.map((user) => {
              return (
                <UserBox>
                  <div className="row">
                    <AvatarBox
                      profile={true}
                      scale={0.12}
                      backScale={0.8}
                      circle={true}
                      userSelect={{ Eye: 1, Hair: 1, Back: 1, Mouth: 1 }}
                    />
                    <div className="avatar">{user}</div>
                  </div>
                  <UserBtn
                    onClick={() => {
                      ban(user);
                    }}
                  >
                    <GiSiren size={30} />
                  </UserBtn>
                </UserBox>
              );
            })}
          </UserCtn>
        </UserWrap>
        <ChatHeader>
          <Arrow className="left" onClick={() => exithandler()}></Arrow>
          <div className="headtxt">{detail?.title}</div>

          <BiAlignRight size="24" onClick={() => SetisEdit(!isEdit)} />
        </ChatHeader>
        <RoomInfoHeader onClick={() => setIsOpen(!isOpen)}>
          <div className="infotitle">
            <AiOutlineNotification size="20" />
            파티 정보
          </div>
          <Arrow className={isOpen && "UpArrow"} />
        </RoomInfoHeader>
        <RoomInfo isOpen={isOpen}>
          {isOpen && (
            <>
              <RoomBox>
                <RoomBoxTitle>
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
          )}
        </RoomInfo>
        <ChatCtn>
          {chatArr?.map((chat) => {
            return <ChatMessage name={user?.nickName} chat={chat} />;
          })}
          <div style={{ height: "0px" }} ref={scrollRef} />
        </ChatCtn>{" "}
        <ChatInputBox onSubmit={onSubmitHandler}>
          <ChatInput
            placeholder="메시지를 입력하세요"
            value={message?.message}
            name="message"
            onChange={onChange}
          />
          <FaArrowAltCircleUp
            onClick={onSubmitHandler}
            color="white"
            size="30"
            className="sendBtn"
          />
        </ChatInputBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChatHeader = styled.div`
  color: white;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  height: 6%;
  .headtxt {
    margin-left: 20px;
    color: #fff;
    text-shadow: 0 0 7px black, 0 0 10px black, 0 0 21px #fff, 0 0 42px #d90368,
      0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368, 0 0 151px #d90368;
  }
`;

const DrawerHead = styled.div`
  color: var(--white);
  margin: 0% 5%;
  padding: 5% 0%;
  border-bottom: 1px solid #484848;
`;

const RoomInfo = styled.div`
  position: absolute;
  top: 9%;
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 10px 20px;
  background-color: var(--primary);
  color: var(--white);
  gap: 20px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const RoomInfoHeader = styled.div`
  color: var(--white);
  z-index: 10;
  display: flex;
  position: absolute;
  width: 90%;
  top: 6%;
  height: 5%;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary);
  padding: 0px 30px;
  border-radius: 15px;
  .infotitle {
    display: flex;
    gap: 10px;
  }
`;

const RoomBox = styled.div`
  display: flex;
  gap: 20px;
`;
const RoomBoxTitle = styled.div`
  margin-left: 20px;
`;

const RoomBtn = styled.div`
  color: var(--white);
  width: 100%;
  border-radius: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e34079;
`;

const Arrow = styled.div`
  display: inline-block;
  border: 10px solid transparent;
  border-top-color: black;
  margin-top: 12px;
  &.left {
    border-top-color: white;
    margin-top: 0px;
    transform: rotate(90deg);
  }
  &.UpArrow {
    transform: rotate(180deg);
    margin-bottom: 25px;
  }
`;

const UserBtn = styled.div`
  font-size: 13px;
  background-color: var(--primary);
  padding: 0% 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
`;

const UserWrap = styled.div`
  width: ${({ isEdit }) => (isEdit ? "100%" : "0px")};
  z-index: 998;
  position: absolute;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); ;
`;

const UserCtn = styled.div`
  z-index: 90;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: ${({ isEdit }) => (isEdit ? "70%" : "0px")};
  height: 100%;
  padding: 20% 0%;
  right: 0px;
  background-color: var(--gray);
  transition: width 400ms ease-in-out;
  overflow: hidden;
`;
const UserBox = styled.div`
  padding: 20px 20px;
  color: var(--white);
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
  .row {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-left: 10px;
  }
`;
const ChatCtn = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 40px 10px;
  overflow: hidden;
  overflow-y: scroll;
  //? -----모바일에서처럼 스크롤바 디자인---------------
  @media only screen and (min-width: 1200px) {
    ::-webkit-scrollbar {
      width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #898989;
      //스크롤바에 마진준것처럼 보이게
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 15px;
    }
  }
`;

const ChatInputBox = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0px;
  border-top: 2px solid var(--gray);
  .sendBtn {
    position: absolute;
    right: 17%;
  }
`;

const ChatInput = styled.input`
  color: #ddd;
  border: none;
  border-radius: 20px;
  padding: 0px 20px;
  width: 70%;
  height: 40px;
  background-color: var(--gray);
`;

const ChatBtn = styled.button`
  position: relative;
  right: 10%;
  width: 10%;
  max-width: 42.8px;
  height: 40px;
  border: none;
  border-radius: 100%;
  box-shadow: 0px 3px 3px 0px gray;
`;

export default ChatRoom;
