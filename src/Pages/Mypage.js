import React from "react";
import MyPage from "../Components/MyPage/MyPage";
import Layout from "../style/Layout";
import MobileHeader from "../style/MobileHeader";

const Mypage = () => {
  return (
    <div>
      <Layout>
        <MobileHeader />
        <MyPage />
      </Layout>
    </div>
  );
};

export default Mypage;
