import React from "react";
import useInput from "../../hooks/UseInput";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal";
import { useState } from "react";

const FindPw = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState();
  const [address, setAddress] = useState();
  const initialState = {
    userId: "",
    phoneNumber: "",
    verifyCode: "",
  };

  const [findUser, setFindUser, onChange] = useInput(initialState);

  //* ------------ 서버로 인증코드 및 전번 보내기 ---------------------

  const postPw = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/sms/sendPW`,
        {
          userId: findUser.userId,
          phoneNumber: findUser.phoneNumber,
        }
      );
      setAlert(true);
      setContent(data.message);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const postVerify = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/sms/verify`,
        {
          userId: findUser.userId,
          phoneNumber: findUser.phoneNumber,
          verifyCode: findUser.verifyCode,
        }
      );
      if (data == "success") {
        setAlert(true);

        setContent("인증성공!");
      }
    } catch (error) {
      console.log(error);
      setAlert(true);
      setContent("다시 시도해주세요!");
    }
  };

  const postChangePw = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/users/change/password`,
        findUser
      );
      console.log(data);
      setAlert(true);
      setContent(data.message);
      setAddress("/");
    } catch (error) {
      setAlert(true);
      console.log(error);
      setContent(error.message);
    }
  };

  //useForm 설정

  return (
    <SignUpWrap>
      {alert && (
        <AlertModal setAlert={setAlert} address={address} content={content} />
      )}
      <SignUpHeader>
        <Arrow onClick={() => navigate("/")} />
        <div>비밀번호 찾기</div>
        <div></div>
      </SignUpHeader>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            placeholder="아이디를 입력해주세요"
            value={findUser.userId}
            name="userId"
            onChange={onChange}
          />
          {/* <small role="alert">dk</small> */}
        </ColumnBox>
      </RowBox>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            placeholder="전화번호를 입력해주세요"
            value={findUser.phoneNumber}
            name="phoneNumber"
            onChange={onChange}
          />
          {/* <small role="alert">dk</small> */}
        </ColumnBox>

        <VerfiyBtn onClick={() => postPw()}>인증번호 전송</VerfiyBtn>
      </RowBox>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            placeholder="인증번호를 입력해주세요"
            value={findUser.verifyCode}
            name="verifyCode"
            onChange={onChange}
          />
          {/* <small role="alert">dk</small> */}
        </ColumnBox>
        <VerfiyBtn onClick={() => postVerify()}>인증번호 확인</VerfiyBtn>
      </RowBox>
      <RowBox>
        <ColumnBox>
          <SignUpInput
            placeholder="바꾸자하는 비밀번호"
            value={findUser.password}
            name="password"
            onChange={onChange}
            type="password"
          />
          {/* <small role="alert">dk</small> */}
        </ColumnBox>

        <VerfiyBtn onClick={() => postChangePw()}>비번바꾸기</VerfiyBtn>
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
  color: var(--white);
  width: 25%;
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

export default FindPw;
