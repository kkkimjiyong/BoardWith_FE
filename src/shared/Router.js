import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Pages/Main/Main";
import SignUpPage from "../Pages/SignUpPage";
import LoginPage from "../Pages/LoginPage";
import Mypage from "../Pages/Mypage";
import Form from "../Pages/Main/Form";
import KaKaoLogin from "../Components/Login/KaKaoLogin";
import DetailPage from "../Pages/DetailPage";
import ChatPage from "../Pages/ChatPage";
import Editpage from "../Pages/Editpage";
import MyPartyPage from "../Pages/MyPartyPage";
import { Modal } from "@mui/material";
import NotifModal from "../tools/NotifModal";
import AvatarPage from "../Pages/AvatarPage";
import FindPage from "../Pages/FindPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup/oauth" element={<KaKaoLogin />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/myparty" element={<MyPartyPage />} />
        <Route path="/editpage" element={<Editpage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/chat/:roomid" element={<ChatPage />} />
        <Route path="/posts/:postid" element={<DetailPage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/find/:id" element={<FindPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
