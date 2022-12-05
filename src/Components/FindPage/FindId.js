import React, { useState } from "react";
import useInput from "../../hooks/UseInput";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindId = () => {
  const navigate = useNavigate();
  const initialState = {
    phoneNumber: "",
    verifyCode: "",
  };

  const [number, setNumber] = useState(55940325);

  const [findUser, setFindUser, onChange] = useInput(initialState);

  //* ------------ 서버로 인증코드 및 전번 보내기 ---------------------

  const postPhone = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/sms/sendID`,
        { phoneNumber: findUser.phoneNumber }
      );
      alert(data.message);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const postVerify = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/sms/verifyID`,
        findUser
      );
      console.log(data);
      if (data) {
        alert(`아이디는 ${data}입니다!`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("다시 시도해주세요!");
    }
  };

  //useForm 설정

  return (
    <SignUpWrap>
      <SignUpHeader>
        <Arrow onClick={() => navigate("/")} />
        <div>아이디 찾기</div>
        <div></div>
      </SignUpHeader>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            placeholder="전화번호를 입력해주세요"
            value={findUser.phoneNumber}
            name="phoneNumber"
            onChange={onChange}
          />
        </ColumnBox>

        <VerfiyBtn onClick={() => postPhone()}>인증번호 받기</VerfiyBtn>
      </RowBox>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            placeholder="인증번호를 입력해주세요"
            value={findUser.verifyCode}
            name="verifyCode"
            onChange={onChange}
          />
        </ColumnBox>
        <VerfiyBtn onClick={() => postVerify()}>아이디 찾기</VerfiyBtn>
      </RowBox>
    </SignUpWrap>
  );
};

const SignUpWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100vh;
  color: white;
`;
const SignUpHeader = styled.div`
  position: absolute;
  top: 0;
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 100%;
  padding: 0 20px;
  margin: 5% 0%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    border: none;
    border-bottom: 2px solid white;
  }
`;

const VerfiyBtn = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  color: var(--white);
  width: 35%;
  background-color: var(--primary);
  border-radius: 15px;
  padding: 5px 10px;
  margin-left: 15%;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.column {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Arrow = styled.div`
  border: 7px solid transparent;
  border-top-color: white;
  transform: rotate(90deg);
`;

export default FindId;
