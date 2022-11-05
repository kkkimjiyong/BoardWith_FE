import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.iceflower.shop/swagger/",
});

export const signUpApi = {
  postSingup: (userinfo) => instance.post("/users/signup", userinfo),
};

export const loginApi = {
  postLogin: (userlogin) => instance.post("/users/login", userlogin),
};

export const userApi = {
  getUser: () => instance.post("/users"),
};
