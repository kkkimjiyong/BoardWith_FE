import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getDistance } from "geolib";
import Pracpost from "../Components/pracpost";

const PracPage = () => {
  const [Posts, SetPosts] = useState();

  const getPosts = async () => {
    try {
      const { data } = await axios.get("https://www.iceflower.shop/posts");
      console.log(data.data);
      SetPosts(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      아아
      {Posts?.map((post) => (
        <Pracpost post={post} />
      ))}
    </div>
  );
};

export default PracPage;
