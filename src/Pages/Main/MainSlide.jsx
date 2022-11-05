import styled from "styled-components";
import MainCard from "./MainCard";

const MainSlide = () => {
  return (
    <Container>
      <MainCard></MainCard>
      <MainCard></MainCard>
      <MainCard></MainCard>
      <MainCard></MainCard>
      <MainCard></MainCard>
      <MainCard></MainCard>
    </Container>
  );
};

export default MainSlide;

const Container = styled.div`
  background-color: #afb4ff;
  display: grid;
  gap: 20px 20px;
  padding: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, minmax(100px, auto));
  width: 100%;
  max-width: 540px;
  height: 660px;
`;
