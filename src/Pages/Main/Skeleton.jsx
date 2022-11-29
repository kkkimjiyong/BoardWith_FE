import styled, { keyframes } from "styled-components";

const Skeleton = () => {
  return (
    <ItemWrap>
      <div className="ItemWrap">
        {" "}
        <div className="ItemWrap-Body-SpaceBetween">
          {" "}
          <div className="avatar-circle">
            <div className="animation" />
          </div>
          <ItemProfile>
            <div className="animation" />
          </ItemProfile>
        </div>{" "}
        <div className="ItemWrap-Body">
          <div>
            {" "}
            <div className="ItemWrap-Top ">
              <div className="animation" />
            </div>
            <div className="ItemWrap-Body-Flex">
              <div className="animation" />
            </div>
            <div className="ItemWrap-Body-Flex2">
              <div className="animation" />
            </div>
          </div>
        </div>
      </div>
    </ItemWrap>
  );
};

export default Skeleton;

const boxAnimation = keyframes`
    0% {
      transform: translateX(-50px);
      /* opacity:1 */
    }
    50%,
    100% {
      transform: translateX(600px);
      /* opacity:1 */
    }
 
   
  `;

const ItemWrap = styled.div`
  .ItemWrap {
    color: #d7d7d7;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 4% 4%;
    flex-direction: column;
    /* background-color: var(--gray); */
    box-shadow: 3px 10px 10px 1px black;
    border-radius: 6px;
    margin: 5% 0%;
    :hover {
      color: white;
      /* box-shadow: 5px 5px 10px 2px #d90368; */
    }
  }
  .avatar-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--gray);
    overflow: hidden;
    margin-right: 5px;
  }

  .ItemWrap-Top {
    /* animation: ${boxAnimation} 2s 0s infinite linear; */
    overflow: hidden;
    display: flex;
    background-color: var(--gray);
    font-size: 1.2rem;
    /* text-align: center; */
    /* align-items: center; */
  }
  .animation {
    background: linear-gradient(
      to right,
      var(--gray),
      var(--black),
      var(--gray)
    );
    width: 50px;
    height: 30px;
    /* position: relative; */
    animation: ${boxAnimation} 2s 0s infinite linear;
  }

  .ItemWrap-Body-SpaceBetween {
    display: flex;
  }
  .ItemWrap-Body-Flex {
    gap: 5px;
    display: flex;
    align-items: center;
    margin-top: 2%;
    background-color: var(--gray);
    overflow: hidden;

    /* animation: ${boxAnimation} 2s 0s infinite linear; */
  }
  .ItemWrap-Body-Flex2 {
    display: flex;
    align-items: center;
    margin-top: 2%;
    justify-content: space-between;
    background-color: var(--gray);
    overflow: hidden;
  }

  .ItemWrap-Body {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    text-align: left;
    margin-top: 3%;
  }

  .ItemWrap-Body-Title {
    /* animation: ${boxAnimation} 2s 0s infinite linear; */
    display: flex;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 2%;
    position: relative;
    /* background-color: #e2e5e7; */
  }
  .ItemWrap-Body-Wanted {
    display: flex;
    border-radius: 130px;
    background-color: #e2e5e7;
    white-space: nowrap;
    width: 30%;
    justify-content: center;
    padding: 0.5%;
  }
`;
const ItemProfile = styled.div`
  /* font-size: 16px; */
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  width: 40%;
  overflow: hidden;
  background-color: var(--gray);

  /* animation: ${boxAnimation} 2s 0s infinite linear; */
`;

// @keyframes loading {
//     0% {
//       transform: translateX(0);
//     }
//     50%,
//     100% {
//       transform: translateX(460px);
//     }
//   }

//   .skeleton-item::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 30px;
//     height: 100%;
//     background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
//     animation: loading 2s infinite linear;
//   }
