import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/UseInput";
import { loginApi } from "../../instance";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    id: "",
    password: "",
  };

  const [login, setLogin, onChangehandler] = useInput(initialState);

  const postLogin = async (payload) => {
    try {
      const data = await loginApi.postLogin(payload);
      console.log(data);
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
      </BtnSet>
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
