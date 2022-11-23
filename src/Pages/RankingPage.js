import React from "react";
import Layout from "../style/Layout";
import Ranking from "../Components/Rank/Ranking";
import MobileHeader from "../style/MobileHeader";

const RankingPage = () => {
  return (
    <Layout>
      <Ranking />
      <MobileHeader />
    </Layout>
  );
};

export default RankingPage;
