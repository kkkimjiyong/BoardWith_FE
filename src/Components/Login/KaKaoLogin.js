// import React from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { getCookie, setCookie } from "../../mytools/Cookiehook";
// import { useNavigate } from "react-router-dom";

// const KaKaoLogin = () => {
//   const naviate = useNavigate();

//   let href = window.location.href;
//   //href값에서 code값만 거내오면 된다.
//   console.log(href);
//   let params = new URL(window.location.href).searchParams;
//   let code = params.get("code");

//   const REST_API_KEY = "52825ae71c4b6cef839a32553fcc6890";
//   const REDIRECT_URI = "http://localhost:3000/signup/oauth";
//   const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//   //이 코드를 백엔드로 보내주면됨
//   console.log(code);

//   async function getKaKaoToken() {
//     try {
//       const { data } = await axios.post(
//         "https://kauth.kakao.com/oauth/token",
//         `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
//         {
//           headers: {
//             "Content-Type": `application/x-www-form-urlencoded`,
//           },
//         }
//       );
//       console.log(data.access_token);
//       setCookie("KakaoToken", data.access_token, { path: "/" });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function getUserinfo() {
//     const data = await axios.get("https://kapi.kakao.com/v2/user/me", {
//       headers: {
//         Authorization: `Bearer ${getCookie("KakaoToken")}`,
//         "Content-Type": `application/x-www-form-urlencoded;charset=utf-8`,
//       },
//     });
//   }

//   console.log(Fetch());
//   useEffect(() => {
//     Fetch();
//   }, []);

//   return (
//     <div>
//       로그인 성공!
//       <button onClick={() => getKaKaoToken()}>액세스토큰받기</button>
//       <button onClick={() => getUserinfo()}>유저정보받기</button>
//     </div>
//   );
// };

// export default KaKaoLogin;
