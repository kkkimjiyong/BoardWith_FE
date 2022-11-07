import axios from "axios";

const instance = axios.create({
  baseURL: "http://iceflower.shop/ ",
  headers: {
    // Authorization: `Bearer ${token}`,
  },
});

export const postApi = {
  // postDetail: () => instance.post(`/posts`),
  // getDetail: () => instance.get(`/posts`),
  getDetailId: () => instance.get(`/posts/{postid}`),
  editDetail: () => instance.post(`/posts/{postid}`),
  delDetail: () => instance.post(`/posts/{postid}`),
};

export const commentsApi = {
  getComments: () => instance.get(`/comments/{postid}`),
  postComments: () => instance.post(`/comments/{posetid}`),
  editComments: () => instance.put(`/comments/{commentid}`),
  delComments: () => instance.delete(`/comments/{commentid}`),
};
