import React from "react";
import Layout from "../style/Layout";
import MobileHeader from "../style/MobileHeader";
import MainSlide from "../Components/Main/MainSlide";

const MainPage = () => {
  return (
    <Layout>
      <MobileHeader />
      <MainSlide></MainSlide>
    </Layout>
  );
};

export default MainPage;
