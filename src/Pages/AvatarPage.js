import React from "react";
import styled from "styled-components";
import AvatarBox from "../Components/Avatar/AvatarBox";
import AvatarSelect from "../Components/Avatar/AvatarSelect";
import Layout from "../style/Layout";
import MobileHeader from "../style/MobileHeader";

const AvatarPage = () => {
  return (
    <Layout>
      <MobileHeader />
      <AvatarSelect />
    </Layout>
  );
};

export default AvatarPage;
