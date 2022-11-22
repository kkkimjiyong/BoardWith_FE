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
        "https://www.iceflower.shop/sms/sendID",
        { phoneNumber: findUser.phoneNumber }
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const postVerify = async () => {
    try {
      const { data } = await axios.post(
        "https://www.iceflower.shop/sms/verifyID",
        findUser
      );
      if (data) {
        alert(`아이디는 ${data}입니다!`);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  //useForm 설정

  return (
    <SignUpWrap>
      <SignUpHeader>
        <Arrow onClick={() => navigate("/")} />
        <div>호호</div>
      </SignUpHeader>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            value={findUser.phoneNumber}
            name="phoneNumber"
            onChange={onChange}
          />
        </ColumnBox>

        <VerfiyBtn onClick={() => postPhone()}>인증번호 받기!</VerfiyBtn>
      </RowBox>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            value={findUser.verifyCode}
            name="verifyCode"
            onChange={onChange}
          />
        </ColumnBox>
        <VerfiyBtn onClick={() => postVerify()}>인증번호 전송!</VerfiyBtn>
      </RowBox>
    </SignUpWrap>
  );
};

const SignUpWrap = styled.div`
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
  position: fixed;
  top: 0;
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  padding-right: 40%;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 90%;
  padding: 0 20px;
  margin-bottom: 5px;
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
  color: #2e294e;
  width: 35%;
  background-color: #ddd;
  border-radius: 15px;
  padding: 5px 10px;
`;

const RowBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
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
