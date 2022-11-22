import React, { useState } from "react";
import styled from "styled-components";

const AvatarBox = ({ userSelect }) => {
  const [Face, setFace] = useState(1);
  console.log(userSelect);
  const { Eye, Hair, Mouth, Back } = userSelect;
  console.log(Mouth);
  return (
    <AvatarCtn>
      <BackCtn Back={Back}>
        {" "}
        <FaceCtn Face={Face}>
          <HairCtn Hair={Hair} />
          <EyeCtn Eye={Eye} />
          <MouthCtn Mouth={Mouth} />
        </FaceCtn>
      </BackCtn>
    </AvatarCtn>
  );
};

const AvatarCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45vh;
  width: 45vh;
  border: 2px solid black;
`;

const BackCtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${({ Back }) => `url(/avatar/Back/${Back}.png)`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const FaceCtn = styled.div`
  width: 80%;
  height: 80%;
  border: 3px solid black;
  background-image: ${({ Face }) => `url(/avatar/Face/${Face}.png)`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  /* background: transparent; */
`;

const HairCtn = styled.div`
  width: 100%;
  height: 45%;
  top: 0%;
  border: 3px solid gainsboro;
`;

const EyeCtn = styled.div`
  position: relative;
  width: 100%;
  height: 20%;
  border: 4px solid blue;
  background-image: ${({ Eye }) => `url(/avatar/Eye/${Eye}.png)`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
const MouthCtn = styled.div`
  position: relative;
  width: 100%;
  height: 20%;
  border: 4px solid wheat;
  background-image: ${({ Mouth }) => `url(/avatar/Mouth/${Mouth}.png)`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export default AvatarBox;
