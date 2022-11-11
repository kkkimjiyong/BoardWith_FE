import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Pages/Main/Main";
import SignUpPage from "../Pages/SignUpPage";
import Layout from "../style/Layout";
import LoginPage from "../Pages/LoginPage";
import Mypage from "../Pages/Mypage";
import Form from "../Pages/Main/Form";
import KaKaoLogin from "../Components/Login/KaKaoLogin";
import DetailPage from "../Pages/DetailPage";
import PracPage from "../Pages/PracPage";
import ChatPage from "../Pages/ChatPage";
import Editpage from "../Pages/Editpage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/login/oauth" element={<KaKaoLogin />} /> */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/editpage" element={<Editpage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/practice" element={<PracPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
