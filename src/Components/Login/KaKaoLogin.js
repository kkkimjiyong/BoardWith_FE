import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { getCookie, setCookie } from "../../hooks/CookieHook";
import { useNavigate } from "react-router-dom";

const KaKaoLogin = () => {
  const naviate = useNavigate();

  let href = window.location.href;
  //href값에서 code값만 거내오면 된다.
  console.log(href);
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");

  const REST_API_KEY = "55dc07a0e4c564bac2630a91922eab90";
  const REDIRECT_URI = "http://localhost:3000/signup/oauth";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //이 코드를 백엔드로 보내주면됨
  console.log(code);

  const postCode = async () => {
    try {
      const { data } = await axios.post(
        "https://www.iceflower.shop/kakao/callback",
        { code: code, nickName: "123", address: "124" }
      );
      console.log(data.accessToken);
      if (data.accessToken)
        setCookie("access_token", data.accessToken, { path: "/" });
      setCookie("kakao", true, { path: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postCode();
  }, []);

  return <div>로그인 성공!</div>;
};

export default KaKaoLogin;
