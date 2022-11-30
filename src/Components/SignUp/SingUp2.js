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

const SignUp2 = () => {
  const initialState = { phoneNumber: "", verifyCode: "" };
  const [user, setUser, onChange] = useInput(initialState);
  const navigate = useNavigate();

  //* ---------------------  인증번호 관련 기능 -------------------

  const postVerify = async () => {
    if (
      user.phoneNumber.length === 11 &&
      user.phoneNumber.slice(0, 3) === "010"
    ) {
      postPhone();
    } else {
      alert("전화번호를 다시 입력해주세요!");
    }
  };

  const postPhone = async () => {
    try {
      const { data } = await axios.post("https://www.iceflower.shop/sms/send", {
        phoneNumber: user.phoneNumber,
      });
      console.log(data);
      if (data) {
        alert("인증번호 전송!");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  const postVerifyCode = async () => {
    try {
      const { data } = await axios.post(
        "https://www.iceflower.shop/sms/verify",
        user
      );
      if (data == "success") {
        alert("인증성공!");
        navigate("/signup3");
      } else {
        alert("틀려요!");
      }
    } catch (error) {
      console.log(error);
      alert("틀려요!");
    }
  };

  return (
    <Layout>
      <SignUpWrap>
        <SignUpCtn>
          <SignUpHeader>
            <Arrow onClick={() => navigate("/signup1")} />
            <div>회원가입</div>
          </SignUpHeader>
          <h3>본인인증 해주세요</h3>
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

          <SignUpInput
            placeholder="인증번호를 입력해주세요."
            onChange={onChange}
            value={user.verifyCode}
            name="verifyCode"
          />

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
`;

const InputBirth = styled.input`
  border-radius: 5px;
  width: 10%;
  padding: 10px;
  border: 2px solid #9747ff;
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

const DaumPostBox = styled.div`
  position: relative;
  box-shadow: 0px 3px 3px 0px gray;
  width: 400px;
`;

const NextBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  position: fixed;
  bottom: 50px;
  font-weight: 600;
  width: 80%;
  max-width: 500px;
  height: 3em;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 0px gray;
  cursor: pointer;
  background-color: var(--primary);
  :hover {
    background-color: gray;
  }
`;

const WholeBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TagBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 40px;
  margin: 10px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid white;
  &:focus-within {
    border-bottom: 2px solid white;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: var(--primary);
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const TagButton = styled.button`
  background-color: transparent;
  text-shadow: 0px 1px 1px 0px var(--black);
  border: none;
  color: var(--red);
`;

const TagInput = styled.input`
  color: white;
  display: inline-flex;
  min-width: 250px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

const Arrow = styled.div`
  border: 7px solid transparent;
  border-top-color: white;
  transform: rotate(90deg);
`;

const AlertError = styled.div`
  font-size: 14px;
  color: red;
`;

export default SignUp2;
