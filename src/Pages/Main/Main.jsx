import styled from "styled-components";
import Layout from "../../style/Layout";
import MainFilter from "./MainFilter";
import MainSlide from "./MainSlide";

const Main = () => {
  return (
    <Layout>
      <MainSlide></MainSlide>
      <MainFilter />
    </Layout>
  );
};

export default Main;
