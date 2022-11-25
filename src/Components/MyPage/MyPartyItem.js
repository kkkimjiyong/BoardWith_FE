import React, { useState } from "react";
import styled from "styled-components";
import DetailModal from "../Detail/DetailModal";

const MyPartyItem = ({ party }) => {
  const [ModalOpen, setModalOpen] = useState();
  console.log(party);
  return (
    <Wrap onClick={() => setModalOpen(true)}>
      {party.title}
      <Arrow className="left" />
      {ModalOpen && (
        <DetailModal postid={party._id} setModalOpen={setModalOpen} />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  color: white;
  background-color: var(--gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 2% 5%;
`;

const Arrow = styled.div`
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  &.left {
    transform: rotate(270deg);
  }
  &.open {
    margin-top: 7px;
    transform: rotate(0deg);
  }
  &.head {
    border-top-color: white;
  }
`;

export default MyPartyItem;
