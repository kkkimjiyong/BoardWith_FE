import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ReactDaumPost from "react-daumpost-hook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../../instance.js";

const SignUp = () => {
  const navigate = useNavigate();
  //yup을 이용한 유효섬겅증방식
  const formSchema = yup.object({
    id: yup
      .string()
      .required("아이디를 입력해주세요")
      .min(9, "최소 9자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다"),
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
    nickname: yup
      .string()
      .required("닉네임을 입력해주세요")
      .min(2, "최소 2자 이상 가능합니다")
      .max(8, "최대 8자 까지만 가능합니다"),
    myPlace: yup.string(),
    //   .required("선호지역을 입력해주세요")
  });

  const postSignUp = async (payload) => {
    try {
      const data = await signUpApi.postSingup(payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //submit 핸들러
  const onSubmit = (data) => {
    reset();
    console.log(data);
    navigate("/login");
    postSignUp(data);
  };

  //useForm 설정
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const ref = useRef(null);

  const postConfig = {
    ref: ref, //팝업창으로 사용시 해당 파라메터를 없애면 된다.
    onComplete: (data) => {
      // 데이터를 받아와서 set해주는 부분
      setValue("address", data.address);
      // 검색후 해당 컴포넌트를 다시 안보이게 하는 부분
      ref.current.style.display = "none";
    },
  };

  const postCode = ReactDaumPost(postConfig);

  return (
    <SignUpCtn onSubmit={handleSubmit(onSubmit)}>
      <SignUpBox>
        <label htmlFor="id">아이디</label>
        <SignUpInput {...register("id")} />
        {errors.id && <small role="alert">{errors.id.message}</small>}
      </SignUpBox>
      <SignUpBox>
        <label>닉네임</label>
        <SignUpInput {...register("nickname")} />
        {errors.nickname && (
          <small role="alert">{errors.nickname.message}</small>
        )}
      </SignUpBox>
      <SignUpBox>
        <label htmlFor="password">비밀번호</label>
        <SignUpInput id="password" type="password" {...register("password")} />
        {errors.password && (
          <small role="alert">{errors.password.message}</small>
        )}
      </SignUpBox>
      <SignUpBox>
        <label htmlFor="confirm">비밀번호확인</label>
        <SignUpInput id="confirm" type="password" {...register("confirm")} />
        {errors.confirm && <small role="alert">{errors.confirm.message}</small>}
      </SignUpBox>
      <SignUpBox>
        주소입력
        <SignUpInput type="text" onClick={postCode} {...register("address")} />
      </SignUpBox>
      <DaumPostBox ref={ref}></DaumPostBox>
      <SignUpBox>
        선호지역
        <SignUpInput type="text" {...register("myPlace")} />
        {errors.myPlace && <small role="alert">{errors.myPlace.message}</small>}
      </SignUpBox>
      <SignUpBox>
        <label htmlFor="birth">생년월일</label>
        <SignUpInput id="birth" type="date" {...register("birth")} />
        {errors.birth && <small role="alert">{errors.birth.message}</small>}
      </SignUpBox>
      <SignUpBox>
        성별
        <select
          type="gender"
          defaultValue="female"
          {...register("gender", { required: true, minLength: 2 })}
        >
          <option value="female">남자</option>
          <option value="male">여자</option>
        </select>
      </SignUpBox>
      <SignUpBox>
        좋아하는 게임
        <SignUpInput type="text" {...register("likeGame")} />
      </SignUpBox>
      <button>회원가입</button>
    </SignUpCtn>
  );
};

const SignUpCtn = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
`;

const SignUpBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SignUpInput = styled.input`
  width: 200px;
  height: 50px;
  border: 3px solid #9747ff;
  border-radius: 10px;
  cursor: pointer;
`;

const DaumPostBox = styled.div`
  position: absolute;
  box-shadow: 0px 3px 3px 0px gray;
  top: 450px;
  left: 940px;
  width: 400px;
`;

export default SignUp;
