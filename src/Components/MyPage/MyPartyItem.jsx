import React, { useState } from "react";
import styled from "styled-components";
import DetailModal from "../Detail/DetailModal";
import { AiFillCloseCircle } from "@react-icons/all-files/ai/AiFillCloseCircle";

const MyPartyItem = ({
  title,
  deletHandler,
  postId,
  party,
  setModalOpen,
  ModalOpen,
}) => {
  console.log(party);
  return (
    <Wrap>
      {ModalOpen === postId && (
        <DetailModal postid={postId} item={party} setModalOpen={setModalOpen} />
      )}
      <Ctn onClick={() => setModalOpen(postId)}>
        {title}

        <Arrow className="left" />
      </Ctn>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  :hover {
    cursor: pointer;
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
  padding: 4% 5%;
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
