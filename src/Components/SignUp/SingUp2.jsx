import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ReactDaumPost from "react-daumpost-hook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../instance.js";
import { useState } from "react";
import axios from "axios";
import useInput from "../../hooks/UseInput.js";
import Layout from "../../style/Layout.js";
import { useDispatch } from "react-redux";
import { addUserData } from "../../redux/modules/CommentsSlice.js";
import AlertModal from "../AlertModal.js";

const SignUp2 = () => {
  const initialState = { phoneNumber: "", verifyCode: "" };
  const [user, setUser, onChange] = useInput(initialState);
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //* ---------------------  인증번호 관련 기능 -------------------

  const postVerify = async () => {
    if (
      user.phoneNumber.length === 11 &&
      user.phoneNumber.slice(0, 3) === "010"
    ) {
      postPhone();
    } else {
      setAlert(true);
      setContent("전화번호를 다시 입력해주세요!");
    }
  };

  const postPhone = async () => {
    setAlert(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/sms/send`,
        {
          phoneNumber: user.phoneNumber,
        }
      );
      console.log(data);
      if (data) {
        dispatch(
          addUserData({
            phoneNumber: user.phoneNumber,
          })
        );
        setContent(data.message);
      }
    } catch (error) {
      if (error.response.data.statusCode === 999) {
        setContent(error.response.data.message);
      }
    }
  };
  const postVerifyCode = async () => {
    setAlert(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_SERVER}/sms/verify`,
        { ...user, verifyCode: user.verifyCode.trim(" ") }
      );
      if (data == "success") {
        setContent("인증성공!");
        setAddress("/signup3");
      } else {
        setContent("틀려요!");
      }
    } catch (error) {
      console.log(error);
      setContent("틀려요!");
    }
  };

  return (
    <Layout>
      <SignUpWrap>
        {alert && (
          <AlertModal setAlert={setAlert} address={address} content={content} />
        )}
        <SignUpCtn>
          <SignUpHeader>
            <Arrow onClick={() => navigate("/signup1")} />
            <div>회원가입</div>
          </SignUpHeader>
          <Title>본인인증 해주세요</Title>
          <RowBox>
            {" "}
            <SignUpInput
              placeholder="전화번호를 입력해주세요."
              onChange={onChange}
              value={user.phoneNumber}
              name="phoneNumber"
            />
            <VerfiyBtn onClick={postVerify}>인증번호 받기</VerfiyBtn>
          </RowBox>
          <RowBox>
            {" "}
            <SignUpInput
              className="verifycode"
              placeholder="인증번호를 입력해주세요."
              onChange={onChange}
              value={user.verifyCode}
              name="verifyCode"
            />
          </RowBox>

          <NextBtn onClick={() => postVerifyCode()}>다음</NextBtn>
        </SignUpCtn>
      </SignUpWrap>{" "}
    </Layout>
  );
};
const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100vh;
  color: white;
`;

const SignUpCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const SignUpHeader = styled.div`
  position: relative;
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

const VerfiyBtn = styled.div`
  font-size: 15px;
  color: var(--white);
  width: 35%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
  border-radius: 15px;
  padding: 5px 10px;
  margin-left: 5%;
  margin-top: 3%;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Title = styled.div`
  line-height: 180%;
  margin-bottom: 5%;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 60%;
  padding: 0 20px;
  margin-top: 5%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ffffff;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    border: none;
    border-bottom: 2px solid white;
  }
  &.verifycode {
    width: 100%;
  }
`;

const NextBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  position: absolute;
  bottom: 50px;
  font-weight: 600;
  width: 80%;
  max-width: 500px;
  font-size: 16px;
  height: 2.5em;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
  background-color: var(--primary);
`;

const Arrow = styled.div`
  border: 7px solid transparent;
  border-top-color: white;
  transform: rotate(90deg);
  :hover {
    cursor: pointer;
  }
`;

export default SignUp2;
