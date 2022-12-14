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

const SignUp1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //yup을 이용한 유효섬겅증방식
  const formSchema = yup.object({
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    confirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다.")
      .required("영문, 숫자포함 8자리를 입력해주세요."),
  });

  //useForm 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  //submit 핸들러
  const onSubmit = (data) => {
    console.log(data);
    dispatch(addUserData(data));
    navigate("/signup2");
  };

  return (
    <Layout>
      <SignUpWrap>
        <SignUpCtn>
          <SignUpHeader>
            <Arrow onClick={() => navigate("/signup")} />
            <div>회원가입</div>
          </SignUpHeader>
          <Title>비밀번호를 입력해주세요</Title>
          <SignUpInput
            placeholder="비밀번호"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <AlertError role="alert">{errors.password.message}</AlertError>
          )}

          <SignUpInput
            placeholder="비밀번호확인"
            type="password"
            {...register("confirm")}
          />
          {errors.confirm && (
            <AlertError role="alert">{errors.confirm.message}</AlertError>
          )}

          <NextBtn onClick={handleSubmit(onSubmit)}>다음</NextBtn>
        </SignUpCtn>
      </SignUpWrap>
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

const Title = styled.div`
  line-height: 180%;
  margin-bottom: 5%;
`;

const SignUpInput = styled.input`
  color: white;
  display: block;
  width: 90%;
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

const AlertError = styled.div`
  font-size: 14px;
  color: red;
`;

export default SignUp1;
