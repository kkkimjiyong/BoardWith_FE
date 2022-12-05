import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Pages/Main/Main";
import SignUpPage from "../Pages/SignUpPage";
import LoginPage from "../Pages/LoginPage";
import Mypage from "../Pages/Mypage";
import Form from "../Pages/Main/Form";
import KaKaoLogin from "../Components/Login/KaKaoLogin";
import ChatPage from "../Pages/ChatPage";
import AvatarPage from "../Pages/AvatarPage";
import FindPage from "../Pages/FindPage";
import PracPage from "../Pages/PracPage";
import RankingPage from "../Pages/RankingPage";
import UserPage from "../Pages/UserPage";
import SharePage from "../Pages/SharePage";
import Search from "../Pages/Main/Search";
import { Suspense, lazy } from "react";
import Loading from "../style/Loading";
import LoginGoogle from "../Components/Login/GoogleLogin";
import SignUp1 from "../Components/SignUp/SignUp1";
import SignUp2 from "../Components/SignUp/SingUp2";
import SignUp3 from "../Components/SignUp/SignUp3";
import NaverLogin from "../Components/Login/NaverLogin";
import Modify from "../Pages/Main/Modify";

// const Main = lazy(() => import("../Pages/Main/Main"));
// const AvatarPage = lazy(() => import("../Pages/AvatarPage"));
// const Mypage = lazy(() => import("../Pages/Mypage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup1" element={<SignUp1 />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/signup3" element={<SignUp3 />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup/oauth" element={<KaKaoLogin />} />
          <Route path="/signup/google" element={<LoginGoogle />} />
          <Route path="/signup/naver" element={<NaverLogin />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/userpage/:nickname" element={<UserPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/chat/:roomid" element={<ChatPage />} />
          <Route path="/posts/:postid" element={<SharePage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/find/:id" element={<FindPage />} />
          <Route path="/prac" element={<PracPage />} />
          <Route path="/rank" element={<RankingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/modify/:id" element={<Modify />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
