import React from "react";
import SignUp from "../Components/SignUp/SignUp";
import Layout from "../style/Layout";
import Logo from "../style/Logo";
import MobileHeader from "../style/MobileHeader";

const SignUpPage = () => {
  return (
    <div>
      <Layout>
        <MobileHeader />
        <Logo />
        <SignUp />
      </Layout>
    </div>
  );
};

export default SignUpPage;
