import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Avatar } from "../../Assets/Avatar/Standard.svg";

const AvatarBox = ({ userSelect }) => {
  const [Face, setFace] = useState(1);
  console.log(userSelect);
  useEffect(() => {}, []);
  if (userSelect) {
    const { Eye, Hair, Mouth } = userSelect;
    console.log(Mouth);
    return (
      <AvatarCtn>
        <BackCtn>
          <img
            className="Hair"
            src={`/avatar/Hair/Hair${Hair}.png`}
            alt="Hair!"
          />
        </BackCtn>
        <img className="Eye" src={`/avatar/Eye/Eye${Eye}.png`} alt="Eye!" />

        <img
          className="Mouth"
          src={`/avatar/Mouth/Mouth${Mouth}.png`}
          alt="이런!"
        />
        <AvatarSqr>
          <div className="nose" />
        </AvatarSqr>
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
  height: 38vh;
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
    top: -15%;
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

const BackCtn = styled.div`
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
    top: -15.5%;
    position: absolute;
  }
`;

export default AvatarBox;
