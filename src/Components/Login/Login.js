import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/UseInput";
import { loginApi } from "../../instance";
import { setCookie } from "../../hooks/CookieHook";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const initialState = {
    userId: "",
    password: "",
  };
  const [login, setLogin, onChangehandler] = useInput(initialState);

  const REST_API_KEY = "52825ae71c4b6cef839a32553fcc6890";
  const REDIRECT_URI = "http://localhost:3000/signup/oauth";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const postLogin = async (payload) => {
    try {
      const { data } = await loginApi.postLogin(payload);
      console.log(data);
      setCookie("accessToken", data.accessToken, { path: "/" });
      setCookie("refresh_token", data.refresh_token, { path: "/" });
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const onSubmitHandler = (e) => {
    console.log(error);
    postLogin(login);
    if (error) {
      alert(error);
      setLogin(initialState);
    } else {
      navigate("/");
    }
  };

  return (
    <LoginCtn>
      <LoginTitle>로그인</LoginTitle>
      <LoginInput
        value={login.userId}
        name="userId"
        onChange={onChangehandler}
        placeholder="아이디"
      />
      <LoginInput
        type="password"
        value={login.password}
        name="password"
        onChange={onChangehandler}
        placeholder="비밀번호"
      />
      <BtnSet>
        <LoginBtn onClick={() => onSubmitHandler()}>로그인</LoginBtn>
        <LoginBtn onClick={() => navigate("/signup")}>회원가입</LoginBtn>
      </BtnSet>{" "}
      <KaKaoLogin href={KAKAO_AUTH_URL}></KaKaoLogin>
    </LoginCtn>
  );
};

const LoginCtn = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  margin: 150px 20px;
  gap: 20px;
  border: 2px solid #9747ff;
  border-radius: 10px;
`;

const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const LoginInput = styled.input`
  width: 87%;
  height: 40px;
  border: 3px solid #9747ff;
  border-radius: 10px;
  padding-left: 30px;
`;

const BtnSet = styled.div`
  width: 87%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 30px;
`;

const LoginBtn = styled.div`
  font-size: 14px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  background-color: #9747ff;
`;

const KaKaoLogin = styled.div`
  padding-left: 10px;
  height: 40px;
  border-radius: 10px;
  background-color: #fee500;
  background-image: url("https://i.ibb.co/B2GHVc4/kakao-login-large-wide.png");
  width: 87%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Login;
