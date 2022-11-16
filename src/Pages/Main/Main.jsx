import styled from "styled-components";
import Layout from "../../style/Layout";
import MobileHeader from "../../style/MobileHeader";
import MainFilter from "./MainFilter";
import MainSlide from "./MainSlide";

const Main = () => {
  return (
    <Layout>
      {/* <MobileHeader /> */}
      <MainSlide></MainSlide>
    </Layout>
  );
};

export default Main;
