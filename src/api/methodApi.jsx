import axiosClient from "./axiosClient.jsx";

const methodApi = {
  getAll: (url, params) => {
    return axiosClient.get(url, { params });
  },

  get: (url, id) => {
    return axiosClient.get(`${url}/${id}`);
  },

  post: (url, params) => {
    return axiosClient.post(url, params);
  },
};

export default methodApi;
