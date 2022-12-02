import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/UseInput";
import { loginApi } from "../../instance";
import { setCookie } from "../../hooks/CookieHook";
import NotifModal from "../../tools/NotifModal";
import { ReactComponent as MainLogo } from "../../Assets/MyLogo.svg";
import MyLogo from "../../Assets/MainLogo.png";
import cookie from "react-cookies";
import NaverLogin from "../../Components/Login/NaverLogin";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const initialState = {
    userId: "",
    password: "",
  };
  const [login, setLogin, onChangehandler] = useInput(initialState);

  const GOOGLE_CLIENT_ID =
    "601009542517-255ebev9elhpvn2mp5kn653q51832dk4.apps.googleusercontent.com";
  const GOOGLE_REDIRECT_URI = "https://boardwith.vercel.app/signup/google";
  const REST_API_KEY = "55dc07a0e4c564bac2630a91922eab90";
  const REDIRECT_URI = "https://boardwith.vercel.app/signup/oauth";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  const postLogin = async (payload) => {
    try {
      const { data } = await loginApi.postLogin(payload);
      console.log(data.nickName);
      if (data.accessToken) {
        console.log("나 푸쉬됬어요3");
        setCookie("accessToken", data.accessToken, {
          path: "/",
        });
        setCookie("refreshToken", data.refresh_token, {
          path: "/",
        });
        setCookie("nickName", data.nickName);
        setCookie("123", "123", {
          path: "/",
          httpOnly: true,
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
      <SocialLoginBox>
        {" "}
        <NaverLogin className="naver"></NaverLogin>
        <KaKaoLogin href={KAKAO_AUTH_URL}></KaKaoLogin>
        <LoginGoogle href={GOOGLE_LOGIN_URL}></LoginGoogle>
      </SocialLoginBox>
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
  margin-top: 10%;
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

const LoginInput = styled.input`
  color: white;
  width: 87%;
  height: 40px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  padding-left: 30px;
  margin-bottom: 5%;
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
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  margin-top: 10%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  background-color: var(--primary);
  box-shadow: 0px 3px 10px 0px black;
`;

const KaKaoLogin = styled.a`
  height: 40px;
  border-radius: 10px;
  background-color: #fee500;
  background-image: url("https://i.ibb.co/3SG3qrZ/image.png");
  width: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0px 3px 10px 0px black;
`;

const LoginGoogle = styled.a`
  color: black;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  width: 40px;
  background-image: url("https://i.ibb.co/K5pfVsP/image.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0px 3px 10px 0px black;
  justify-content: center;
  align-items: center;
  display: flex;
  text-decoration: none;
`;

const SocialLoginBox = styled.div`
  width: 100%;
  padding: 0 10%;
  display: flex;
  margin-top: 10%;
  justify-content: space-around;
  .naver {
    width: 30px;
  }
`;

const BottomTxt = styled.div`
  margin-top: 5%;
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
