import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FindId from "./FindId";
import FindPw from "./FindPw";

const FindUser = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <Wrap>
      {id === "id" && <FindId />}
      {id === "pw" && <FindPw />}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;

export default FindUser;
