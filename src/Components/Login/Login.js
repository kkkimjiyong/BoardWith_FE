import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/UseInput";
import { loginApi } from "../../instance";
import { setCookie } from "../../hooks/CookieHook";
import NotifModal from "../../tools/NotifModal";
import { ReactComponent as MainLogo } from "../../Assets/MyLogo.svg";
import MyLogo from "../../Assets/MainLogo.png";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const initialState = {
    userId: "",
    password: "",
  };
  const [login, setLogin, onChangehandler] = useInput(initialState);
const expires = new Date();
  
  const REST_API_KEY = "55dc07a0e4c564bac2630a91922eab90";
  const REDIRECT_URI = "https://boardwith.vercel.app/signup/oauth";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const postLogin = async (payload) => {
    try {
      const { data } = await loginApi.postLogin(payload);
      console.log(data.nickName);
      if (data.accessToken) {
        console.log("나 푸쉬됬어요1")
        setCookie("accessToken", data.accessToken, { path: "/" });
        setCookie("refreshToken", data.refresh_token, {
           httpOnly: true,
secure: true,
sameSite: "none",
          expires
          path: "/",
        });
        setCookie("nickName", data.nickName);
      }
      navigate("/main");
    } catch (error) {
      alert("다시 로그인해주세요");
      console.log(error);
    }
  };

  const onSubmitHandler = (e) => {
    console.log(error);
    postLogin(login);
  };

  return (
    <LoginCtn className="neonBox">
      <MainLogo className="logo" />
      {/* <Logo src={MyLogo} /> */}
      {/* {modalOpen && (
        <NotifModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          content={"다시 로그인해주세요"}
        />
      )} */}
      {/* <a href="/main">일단그냥둘러볼래</a> */}
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
      </BtnSet>{" "}
      <KaKaoLogin href={KAKAO_AUTH_URL}></KaKaoLogin>
      <BottomTxt>
        <div className="txtbox" onClick={() => navigate("/signup")}>
          회원가입
        </div>
        <div className="txtbox" onClick={() => navigate("/find/id")}>
          아이디찾기
        </div>
        <div className="txtbox-noborder" onClick={() => navigate("/find/pw")}>
          비밀번호찾기
        </div>
      </BottomTxt>
    </LoginCtn>
  );
};

const LoginCtn = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  width: 100%;
  height: 100vh;
  gap: 30px;
  border-radius: 10px;
  color: white;
  .logo {
    margin-bottom: 20%;
  }
`;

const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const LoginInput = styled.input`
  color: white;
  width: 87%;
  height: 40px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
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
  color: black;
  font-size: 14px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 3px 10px 0px black;
`;

const KaKaoLogin = styled.a`
  padding-left: 10px;
  height: 50px;
  border-radius: 10px;
  background-color: #fee500;
  background-image: url("https://i.ibb.co/B2GHVc4/kakao-login-large-wide.png");
  width: 87%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0px 3px 10px 0px black;
`;

const BottomTxt = styled.div`
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  .txtbox {
    padding: 0px 20px;
    border-right: 1px solid white;
  }
  .txtbox-noborder {
    padding: 0px 20px;
  }
`;

const Logo = styled.img`
  filter: drop-shadow(0px 3px 3px 0px red);
  /* box-shadow: 0px 3px 3px 0px #ddd; */
`;

export default Login;
