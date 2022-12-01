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
  width: 100%;
  height: 38%;
  background-color: var(--white);
  &.selected {
    border: 2px solid var(--primary);
  }
  .avatar {
    width: 29%;
    left: 35.5%;
    position: absolute;
  }
  .Eye {
    top: -16%;
    width: 90%;
    position: absolute;
  }
  .Mouth {
    top: 5%;
    width: 60%;
    position: absolute;
  }
`;

const AvatarSqr = styled.div`
  width: 155px;
  height: 155px;
  border-radius: 37px;
  border: 5px solid black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  .nose {
    margin-bottom: 10%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
  }
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
    width: 155%;
    top: -14%;
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
    width: 155%;
    top: -14%;
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
    width: 155%;
    top: -14%;
    position: absolute;
  }
`;

export default AvatarBox;
