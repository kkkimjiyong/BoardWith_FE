import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { CgHome } from "@react-icons/all-files/cg/CgHome";
import { GoGraph } from "@react-icons/all-files/go/GoGraph";
import { GoSearch } from "@react-icons/all-files/go/GoSearch";
import Avatar from "../Assets/HeaderAvatar.png";

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <MobileHeaderCtn>
      {" "}
      <GoSearch size="80%" color="white" onClick={() => navigate("/search")} />
      <GoGraph size="80%" color="white" onClick={() => navigate("/rank")} />
      <CgHome size="80%" color="white" onClick={() => navigate("/main")} />
      <img
        className="logo"
        src={Avatar}
        alt={"avatarshop"}
        onClick={() => navigate("/avatar")}
      />
      <CgProfile size="90%" color="white" onClick={() => navigate("/mypage")} />
    </MobileHeaderCtn>
  );
};

const MobileHeaderCtn = styled.div`
  position: absolute;
  z-index: 30;
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
    width: 6%;
    margin: 0 6%;
  }
`;

export default MobileHeader;
