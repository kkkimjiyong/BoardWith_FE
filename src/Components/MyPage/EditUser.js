import React, { useEffect, useState } from "react";
import { userApi } from "../../instance";
import styled from "styled-components";
import useInput from "../../hooks/UseInput";
import { getCookie, setCookie, removeCookie } from "../../hooks/CookieHook";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPencil } from "@react-icons/all-files/bs/BsPencil";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { useRef } from "react";
import ReactDaumPost from "react-daumpost-hook";

const EditUser = ({ setOpenEdit, openEdit, user, setUser, onChange }) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(user.visible == "H");
  console.log(user);

  const toggleHandler = () => {
    let payload = "";
    setOpen(!open);
    if (open) {
      payload = "V";
    } else {
      payload = "H";
    }
    return postVisible(payload);
  };

  //? ----------------- 성별 보이게 안보이게 api --------------------------
  const postVisible = async (payload) => {
    try {
      const { data } = await userApi.editUser({ visible: payload });
      console.log(data.findUserData);
      setUser(data.findUserData);
    } catch (error) {
      console.log(error);
    }
  };

  //? --------------------- 다음포스트  --------------------------

  const ref = useRef(null);

  const postConfig = {
    //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setUser({ ...user, myPlace: data.address.split(" ").slice(0, 2) });
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };
  const postCode = ReactDaumPost(postConfig);

  return (
    <Wrapper openEdit={openEdit}>
      <EditTxt>닉네임</EditTxt>
      <EditInput value={"수정불가"} name="nickName" onChange={onChange} />
      <EditTxt>비공개 설정</EditTxt>
      <EditBox>
        <div> 나이, 성별, 지역</div>
        <ToggleBox open={open}>
          <div onClick={toggleHandler} className="circleBtn" />
        </ToggleBox>
      </EditBox>
      <EditTxt className="info">
        앱에서 다른 사용자에게 나의 나이, 성별, 지역 정보를 비공개설정할 수
        있습니다.
      </EditTxt>
      <EditTxt>나이</EditTxt>

      <EditInput
        value={user.age}
        name="age"
        onChange={onChange}
        type="selectbox"
      />
      <EditTxt>성별</EditTxt>

      <EditSelect value={user.gender} name="gender" onChange={onChange}>
        <Option value="female">여자</Option>
        <Option value="male">남자</Option>
      </EditSelect>
      <EditTxt>지역</EditTxt>

      <EditBox onClick={postCode}>
        {" "}
        {user.myPlace[0]} {user.myPlace[1]}
      </EditBox>

      <div ref={ref}></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 12;
  bottom: ${({ openEdit }) => (openEdit ? "0%" : "-30%")};
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ openEdit }) => (openEdit ? "100%" : "0%")};
  padding: 0% 5%;
  background-color: var(--black);
  transition: all 1s ease-in-out;
`;

const RowBox = styled.div`
  display: flex;
  gap: 20px;
`;

const EditInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: var(--gray);
  border: none;
  border-radius: 10px;
  margin-top: 3%;
  padding: 0% 5%;
  color: var(--white);
`;

const EditSelect = styled.select`
  font-size: 16px;
  width: 100%;
  height: 50px;
  background-color: var(--gray);
  border: none;
  border-radius: 10px;
  margin-top: 3%;
  padding: 0% 5%;
  color: var(--white);
`;

const Option = styled.option`
  height: 30px;
`;

const EditBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: var(--gray);
  color: var(--white);
  border: none;
  border-radius: 10px;
  margin-top: 3%;
  padding: 0% 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const EditTxt = styled.div`
  color: #7a7a7a;
  font-size: 16px;
  width: 100%;
  margin-top: 6%;
  padding: 0% 5%;
  &.info {
    font-size: 14px;
    margin-top: 2%;
  }
`;

const ToggleBox = styled.div`
  width: 15%;
  height: 60%;
  border-radius: 30px;
  background-color: ${({ open }) => (open ? "#c72363" : "#5c5c5c")};
  display: flex;
  transition: all 1s;
  justify-content: ${({ open }) => (open ? "flex-end" : "flex-start")};
  align-items: center;
  padding: 0% 1%;
  .circleBtn {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: var(--white);
  }
`;

const Arrow = styled.div`
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  &.left {
    transform: rotate(270deg);
  }
  &.open {
    margin-top: 7px;
    transform: rotate(0deg);
  }
  &.head {
    border-top-color: white;
  }
`;

export default EditUser;
