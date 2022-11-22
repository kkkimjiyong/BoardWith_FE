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
        { phoneNumber: "01055940325" }
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
        {
          ...findUser,
          phoneNumber: "01055940325",
        }
      );
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
          <input
            value={findUser.phoneNumber}
            name="phoneNumber"
            onChange={onChange}
          />
          <small role="alert">dk</small>
        </ColumnBox>

        <button onClick={() => postPhone()}>post 전번</button>
      </RowBox>
      <RowBox>
        <ColumnBox>
          <input
            value={findUser.verifyCode}
            name="verifyCode"
            onChange={onChange}
          />
          <small role="alert">dk</small>
        </ColumnBox>
        <button onClick={() => postVerify()}>post 전번,인증번호</button>
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
  color: white;
`;
const SignUpHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px;
  padding-right: 40%;
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
