import React from "react";
import OtherUserPage from "../Components/MyPage/OtherUserPage";
import Layout from "../style/Layout";
import MobileHeader from "../style/MobileHeader";

const UserPage = () => {
  return (
    <Layout>
      <MobileHeader />
      <OtherUserPage />
    </Layout>
  );
};

export default UserPage;
