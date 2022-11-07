import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "../Pages/SignUpPage";
import Layout from "../style/Layout";
import LoginPage from "../Pages/LoginPage";
import Mypage from "../Pages/Mypage";
import KaKaoLogin from "../Components/Login/KaKaoLogin";
import DetailPage from "../Pages/DetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/login/oauth" element={<KaKaoLogin />} /> */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
