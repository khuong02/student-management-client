import axiosClient from "./axiosClient.jsx";

const methodApi = {
  getParams: (url, params) => {
    return axiosClient.get(url, { params });
  },

  getAll: (url) => {
    return axiosClient.get(url);
  },

  getToken: (url, config) => {
    return axiosClient.get(url, config);
  },

  getForId: (url, id) => {
    return axiosClient.get(`${url}/${id}`);
  },

  post: (url, params) => {
    return axiosClient.post(url, params);
  },

  delete: (url, id) => {
    return axiosClient.delete(`${url}/${id}`);
  },
};

export default methodApi;
