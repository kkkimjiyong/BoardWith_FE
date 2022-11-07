import axios from "axios";
import { getCookie } from "./hooks/CookieHook";

const instance = axios.create({
  baseURL: "https://www.iceflower.shop/",
  headers: {
    Authorization: `${getCookie("accessToken")}`,
  },
});

export const signUpApi = {
  postSingup: (userinfo) => instance.post("/users/signup", userinfo),
};

export const loginApi = {
  postLogin: (userlogin) => instance.post("/users/login", userlogin),
};

export const userApi = {
  getUser: () =>
    instance.get("/users", {
      headers: {
        Authorization: `${getCookie("accessToken")}`,
      },
    }),

  editUser: (EditUser) =>
    instance.put("/users", EditUser, {
      headers: {
        Authorization: `${getCookie("accessToken")}`,
      },
    }),
};

export const postApi = {
  // postDetail: () => instance.post(`/posts`),
  getDetail: (payload) => instance.get(`/posts`),
  //getDetailId: (payload) => instance.get(`/posts/${payload}`),
  getDetailId: (payload) => instance.get(`/posts/6368b2a8934c7da20c1758f2`),
  editDetail: (payload) => instance.put(`/posts/6368b2a8934c7da20c1758f2`),
  //editDetail: (payload) => instance.post(`/posts/{postid}`),
  delDetail: (payload) => instance.post(`/posts/{postid}`),
};

export const commentsApi = {
  getComments: (payload) => instance.get(`/comments/{postid}`),
  postComments: (payload) => instance.post(`/comments/{posetid}`),
  editComments: (payload) => instance.put(`/comments/{commentid}`),
  delComments: (payload) => instance.delete(`/comments/{commentid}`),
};
