import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/UseInput";
import { loginApi } from "../../instance";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    id: "",
    password: "",
  };
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
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
      console.log(error);
    }
  };

  const onSubmitHandler = (e) => {
    postLogin(login);
    setLogin(initialState);
  };

  return (
    <LoginCtn>
      <LoginInput
        value={login.id}
        name="id"
        onChange={onChangehandler}
        placeholder="아이디"
      />
      <LoginInput
        value={login.password}
        name="password"
        onChange={onChangehandler}
        placeholder="비밀번호"
      />
      <BtnSet>
        <LoginBtn onClick={() => onSubmitHandler()}>로그인</LoginBtn>
        <LoginBtn onClick={() => navigate("/signup")}>회원가입</LoginBtn>
      </BtnSet>{" "}
      <a href={KAKAO_AUTH_URL}>
        <img
          // onClick={() => SetLoading(false)}
          style={{
            width: "200px",

            cursor: "pointer",
            marginTop: "20px",
          }}
          src="https://i.ibb.co/r2DPcWy/kakao-login-medium-narrow.png"
          alt="kakao-login-medium-narrow"
          border="0"
        />
      </a>
    </LoginCtn>
  );
};

const LoginCtn = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  gap: 50px;
`;

const LoginInput = styled.input`
  width: 300px;
  height: 60px;
  border: 3px solid #9747ff;
  border-radius: 10px;
`;

const BtnSet = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const LoginBtn = styled.div`
  width: 100px;
  height: 50px;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  background-color: #9747ff;
`;

export default Login;
