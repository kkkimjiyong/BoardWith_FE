import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Avatar } from "../../Assets/Avatar/Standard.svg";

const AvatarBox = ({ userSelect }) => {
  if (userSelect) {
    const { Eye, Hair, Mouth } = userSelect;
    return (
      <AvatarCtn>
        <HairCtn>
          <img
            className="Hair"
            src={`/avatar/Hair/Hair${Hair}.svg`}
            alt="Hair!"
          />
        </HairCtn>
        <EyeCtn>
          {" "}
          <img className="Eye" src={`/avatar/Eye/Eye${Eye}.svg`} alt="Eye!" />
        </EyeCtn>
        <MouthCtn>
          <img
            className="Mouth"
            src={`/avatar/Mouth/Mouth${Mouth}.svg`}
            alt="이런!"
          />
        </MouthCtn>
        <SqrCtn>
          <AvatarSqr></AvatarSqr>
        </SqrCtn>
      </AvatarCtn>
    );
  }
};

const AvatarCtn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38%;
  background-color: var(--white);
`;

const AvatarSqr = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  transform: scale(1.6);
  border: 5px solid black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
const SqrCtn = styled.div`
  z-index: 0;
  position: absolute;
  border: 5px solid white;
  top: 0%;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HairCtn = styled.div`
  z-index: 0;
  position: absolute;
  border: 5px solid white;
  top: 0;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .Hair {
    transform: scale(1.6);
    position: absolute;
  }
`;

const EyeCtn = styled.div`
  z-index: 0;
  position: absolute;
  border: 5px solid white;
  top: 0;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .Eye {
    transform: scale(1.6);
    position: absolute;
  }
`;

const MouthCtn = styled.div`
  z-index: 0;
  position: absolute;
  border: 5px solid white;
  top: 0;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .Mouth {
    transform: scale(1.6);
    position: absolute;
  }
`;

export default AvatarBox;
