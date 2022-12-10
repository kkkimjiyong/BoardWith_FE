import React from "react";
import styled from "styled-components";
const AvatarBox = ({
  userSelect,
  avatarScale,
  scale,
  circle,
  backScale,
  profile,
}) => {
  if (userSelect) {
    console.log(userSelect);
    const { Eye, Hair, Mouth, Back } = userSelect;
    return (
      <AvatarCtn profile={profile} translateScale={scale}>
        <BackCtn
          translateBorder={circle}
          translateBackScale={backScale}
          profile={profile}
        >
          <img
            className="Back"
            src={`/avatar/Back/Back${Back}.svg`}
            alt="Back!"
          />
        </BackCtn>
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
          <AvatarSqr>
            <CheekAvatar />
            <CheekAvatar className="right" />
            <NoseAvatar />
          </AvatarSqr>
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
  width: ${({ profile }) => (profile ? "30px" : "100%")};
  height: 38%;
  transform: ${({ translateScale }) => `scale(${translateScale})`};
  /* transform: scale(0.5); */
  /* background-color: var(--white); */
  /* background-color: red; */
`;

const AvatarSqr = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  transform: scale(1.6);
  border: 4px solid black;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  overflow-x: hidden;
  overflow-y: hidden;
`;
const NoseAvatar = styled.div`
  background-color: var(--black);
  position: absolute;
  top: 40%;
  width: 10%;
  height: 10%;
  border-radius: 50%;
`;

const CheekAvatar = styled.div`
  z-index: 0;
  position: absolute;
  top: 30%;
  left: -20%;
  width: 50%;
  height: 50%;
  border: 2px solid var(--black);
  border-radius: 50%;
  &.right {
    left: 70%;
  }
`;

const SqrCtn = styled.div`
  z-index: 1;
  position: absolute;
  top: 0%;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HairCtn = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .Hair {
    z-index: 5;
    transform: scale(1.6);
    position: absolute;
  }
`;

const EyeCtn = styled.div`
  z-index: 2;

  position: absolute;
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
  z-index: 2;
  position: absolute;
  top: 0;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .Mouth {
    margin-bottom: 15%;
    transform: scale(1.6);
    position: absolute;
  }
`;

const BackCtn = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .Back {
    width: ${({ profile }) => (profile ? null : "100%")};
    transform: ${({ translateBackScale }) => `scale(${translateBackScale})`};
    border-radius: ${({ translateBorder }) => (translateBorder ? "50%" : null)};
    position: absolute;
  }
`;

export default AvatarBox;
