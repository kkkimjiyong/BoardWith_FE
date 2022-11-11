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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/login/oauth" element={<KaKaoLogin />} /> */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/practice" element={<PracPage />} />
        <Route path="/posts/:postid" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
