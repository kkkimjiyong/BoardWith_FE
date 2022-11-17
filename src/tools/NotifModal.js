import React from "react";
import styled from "styled-components";

const NotifModal = ({ setModalOpen, content }) => {
  // 모달창 노출
  const closeModal = () => {
    // setModalOpen(false);
    console.log(1);
  };

  return (
    <Wrap onClick={closeModal}>
      {" "}
      <ModalCtn onClick={(e) => e.stopPropagation()}>
        <ContentBox>{content}</ContentBox>{" "}
        <CloseBtn onClick={closeModal}>확인</CloseBtn>
      </ModalCtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
`;

const ModalCtn = styled.div`
  /* 모달창 크기 */
  width: 90%;
  height: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #ddd;
  border: 1px solid black;
  border-radius: 8px;
`;

const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 30px;
  background-color: white;
  border-radius: 10px;
  :active {
    background-color: gray;
  }
`;
const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
`;

export default NotifModal;
