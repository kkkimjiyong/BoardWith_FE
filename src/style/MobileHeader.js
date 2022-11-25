import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CgProfile } from "react-icons/cg";
import { CgHome } from "react-icons/cg";
import { GoGraph, GoSearch } from "react-icons/go";
import Avatar from "../Assets/HeaderAvatar.png";

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <MobileHeaderCtn>
      {" "}
      <GoSearch size="80%" color="white" onClick={() => alert("개발중")} />
      <img className="logo" src={Avatar} onClick={() => navigate("/avatar")} />
      <CgHome size="80%" color="white" onClick={() => navigate("/main")} />
      <GoGraph size="80%" color="white" onClick={() => navigate("/rank")} />
      <CgProfile size="80%" color="white" onClick={() => navigate("/mypage")} />
    </MobileHeaderCtn>
  );
};

const MobileHeaderCtn = styled.div`
  position: absolute;
  z-index: 2;
  height: 6vh;
  background-color: var(--black);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  bottom: 0;
  width: 100%;
  box-shadow: 1px 1px 15px 3px black;
  /* background-color: #9747ff; */
  .logo {
    width: 8%;
    margin: 0 5%;
  }
`;

export default MobileHeader;
