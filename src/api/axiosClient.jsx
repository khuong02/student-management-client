import axios from "axios";
import queryString from "query-string";
// import store from "../redux/store";
// import refreshToken from "../auth/refreshToken";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

// const getServerToken = () => {
//   const { token, account } = store.getState().auth;
//   if (!token) return null;
//   return new Promise((resolve, reject) => {
//     const newToken = async () => {
//       const res = await refreshToken(account);
//       if (!res) reject(null);
//       resolve(res.accessToken);
//     };

//     newToken();
//   });
// };

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  //   const token = getServerToken();
  //   console.log(token);
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    return error.status;
  }
);
export default axiosClient;
