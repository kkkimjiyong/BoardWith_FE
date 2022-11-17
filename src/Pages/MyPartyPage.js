import React from "react";
import Layout from "../style/Layout";
import MobileHeader from "../style/MobileHeader";
import MyParty from "../Components/MyParty/MyParty";

const MyPartyPage = () => {
  return (
    <div>
      <Layout>
        <MobileHeader /> 마이파티페이지입니다.
        <MyParty />
      </Layout>
    </div>
  );
};

export default MyPartyPage;
