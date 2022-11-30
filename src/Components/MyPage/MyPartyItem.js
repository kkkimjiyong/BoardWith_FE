import React, { useState } from "react";
import styled from "styled-components";
import DetailModal from "../Detail/DetailModal";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";

const MyPartyItem = ({ party, deletHandler }) => {
  const [ModalOpen, setModalOpen] = useState();

  return (
    <Wrap>
      <Ctn onClick={() => setModalOpen(true)}>
        {party.title}

        <Arrow className="left" />
        {ModalOpen && (
          <DetailModal postid={party._id} setModalOpen={setModalOpen} />
        )}
      </Ctn>
      <AiFillCloseCircle
        onClick={() => deletHandler(party._id)}
        className="closebtn"
        size={"30"}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .closebtn {
    color: var(--primary);
    margin-left: 2.5%;
    :hover {
      cursor: pointer;
    }
  }
`;

const Ctn = styled.div`
  color: white;
  background-color: var(--gray);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 2% 5%;
`;

const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
`;

const Arrow = styled.div`
  display: inline-block;
  border: 7px solid transparent;
  border-top-color: var(--white);
  transform: rotate(90deg);
  :hover {
    cursor: pointer;
  }
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
