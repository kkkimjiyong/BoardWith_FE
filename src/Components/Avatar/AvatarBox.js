import React from "react";
import styled from "styled-components";
import Man from "../../Assets/face/ManFace.png";
import Sunglasses from "../../Assets/sunglass.png";

const AvatarBox = () => {
  console.log(Man);
  console.log(Sunglasses);
  return (
    <AvatarCtn>
      <ImgCtn />
    </AvatarCtn>
  );
};

const AvatarCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48.5vh;
  width: 48.5vh;
  border: 2px solid black;
`;

const ImgCtn = styled.div`
  width: 80%;
  height: 80%;
  border: 2px solid red;
  background-image: url("/static/media/ManFace.c78ff2c3b51beed201d5.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

export default AvatarBox;
