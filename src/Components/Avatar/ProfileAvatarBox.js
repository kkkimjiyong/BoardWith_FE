import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Avatar } from "../../Assets/Avatar/Standard.svg";

const AvatarBox = ({ userSelect }) => {
  console.log(userSelect);
  if (userSelect) {
    const { Eye, Hair, Mouth } = userSelect;
    console.log(Mouth);
    return (
      <AvatarCtn>
        <BackCtn>
          <img
            className="Hair"
            src={`/avatar/Hair/Hair${Hair}.svg`}
            alt="Hair!"
          />
        </BackCtn>
        <img className="Eye" src={`/avatar/Eye/Eye${Eye}.svg`} alt="Eye!" />

        <img
          className="Mouth"
          src={`/avatar/Mouth/Mouth${Mouth}.svg`}
          alt="이런!"
        />
        <AvatarSqr></AvatarSqr>
        {/* <img
        src={require("../../Assets/Avatar/Standard.svg").default}
        className="avatar"
      /> */}
      </AvatarCtn>
    );
  }
};

const AvatarCtn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
  transform: scale(0.8);
  .Eye {
    width: 60px;
    z-index: 1;
    position: absolute;
  }
  .Mouth {
    z-index: 1;
    position: absolute;
  }
`;

const AvatarSqr = styled.div`
  z-index: 0;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  border: 3px solid black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
`;

const BackCtn = styled.div`
  z-index: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  .Hair {
    z-index: 1;
    width: 100px;
    position: absolute;
  }
`;

export default AvatarBox;
