import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ReactDaumPost from "react-daumpost-hook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi, userApi } from "../../instance.js";
import { useState } from "react";
import axios from "axios";
import useInput from "../../hooks/UseInput.js";
import { useDispatch } from "react-redux";
import { addUserData } from "../../redux/modules/postsSlice.js";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dupId, setDupId] = useState(false);
  const [dupNickName, setDupNickName] = useState(false);

  //yup을 이용한 유효섬겅증방식
  const formSchema = yup.object({
    userId: yup
      .string()
      .required("아이디를 입력해주세요")
      .min(4, "최소 4자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다"),
    nickName: yup
      .string()
      .required("닉네임을 입력해주세요")
      .min(2, "최소 2자 이상 가능합니다")
      .max(8, "최대 8자 까지만 가능합니다"),
  });

  //useForm 설정
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { gender: "female" },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    if (dupId && dupNickName) {
      dispatch(addUserData(data));
      navigate("/signup1");
    } else {
      alert("중복확인을 눌러주세요!");
    }
  };

  const DupId = async () => {
    try {
      const { data } = await signUpApi.DupId({ userId: getValues().userId });
      console.log(data.findDupId);
      alert(data.findDupId);
      setDupId(true);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const DupNickname = async () => {
    try {
      const { data } = await signUpApi.DupNick({
        nickName: getValues().nickName,
      });
      console.log(data.findDupNick);
      alert(data.findDupNick);
      setDupNickName(true);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <SignUpWrap>
        <SignUpCtn>
          {" "}
          <SignUpHeader>
            <Arrow onClick={() => navigate("/")} />
            <div>회원가입</div>
          </SignUpHeader>
          <Title>아이디와 닉네임을 입력해주세요</Title>{" "}
          <RowBox>
            {" "}
            <InputBox>
              {" "}
              <SignUpInput placeholder="아이디" {...register("userId")} />{" "}
              {errors.userId && (
                <AlertError role="alert">{errors.userId.message}</AlertError>
              )}
            </InputBox>
            <VerfiyBtn onClick={() => DupId()}>중복확인</VerfiyBtn>
          </RowBox>
          <RowBox>
            {" "}
            <InputBox>
              <SignUpInput placeholder="닉네임" {...register("nickName")} />
              {errors.nickName && (
                <AlertError role="alert">{errors.nickName.message}</AlertError>
              )}
            </InputBox>
            <VerfiyBtn onClick={() => DupNickname()}>중복확인</VerfiyBtn>
          </RowBox>
          <NextBtn onClick={handleSubmit(onSubmit)}>다음</NextBtn>
        </SignUpCtn>
      </SignUpWrap>{" "}
    </>
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

const Title = styled.div`
  line-height: 180%;
  margin-bottom: 5%;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 100%;
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
`;

const VerfiyBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  bottom: 50px;
  font-weight: 500;
  width: 20%;
  font-size: 14px;
  height: 2.5em;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: var(--primary);
  margin-top: 5%;
  margin-left: 10%;
`;

const NextBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  position: fixed;
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
  background-color: var(--primary);
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

const RowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export default SignUp;
