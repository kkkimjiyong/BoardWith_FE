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
import naverButton from "../../Assets/naverButton.png";
import AlertModal from "../AlertModal";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [alert, setAlert] = useState(false);
  const [content, setContent] = useState();
  const [address, setAddress] = useState();

  const initialState = {
    userId: "",
    password: "",
  };
  const [login, setLogin, onChangehandler] = useInput(initialState);

  const state = "boardwith";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
  const NAVER_LOGIN_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    process.env.REACT_APP_NAVER_CLIENT_ID
  }&redirect_uri=${
    process.env.REACT_APP_NAVER_CALLBACK_URL
  }&state=${Math.random().toString(36).substr(3, 14)}`;

  const postLogin = async (payload) => {
    try {
      const { data } = await loginApi.postLogin(payload);
      console.log(data.nickName);
      if (data.accessToken) {
        setAlert(true);
        sessionStorage.setItem("accessToken", data.accessToken, {
          path: "/",
        });
        sessionStorage.setItem("refreshToken", data.refresh_token, {
          path: "/",
        });
        sessionStorage.setItem("nickName", data.nickName);
        setContent("환영합니다!");
      }
      setAddress("/main");
    } catch (error) {
      setAlert(true);
      setContent("다시 로그인해주세요");
      console.log(error);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(error);
    postLogin(login);
  };

  return (
    <LoginCtn onSubmit={onSubmitHandler} className="neonBox">
      {alert && (
        <AlertModal setAlert={setAlert} address={address} content={content} />
      )}
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
        <LoginBtn>로그인</LoginBtn>
      </BtnSet>{" "}
      <SocialLoginBox>
        {" "}
        <NaverLogin
          //
          // href={NAVER_LOGIN_URL}
          onClick={() => alert("현재 개발중입니다!")}
        ></NaverLogin>
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

const LoginBtn = styled.button`
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

const NaverLogin = styled.div`
  height: 40px;
  border-radius: 10px;
  /* background-color: #fee500; */
  background-image: url(${naverButton});
  width: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
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
    :hover {
      cursor: pointer;
    }
  }
  .txtbox-noborder {
    padding: 0px 20px;
    :hover {
      cursor: pointer;
    }
  }
`;

const Logo = styled.img`
  filter: drop-shadow(0px 3px 3px 0px red);
  /* box-shadow: 0px 3px 3px 0px #ddd; */
`;

export default Login;
