import axios from "axios";

const refreshToken = async (account) => {
  return new Promise((resolve, reject) => {
    const checkRefreshToken = async () => {
      return await axios
        .post(`${process.env.REACT_APP_API_URL}/api/user/token`, { account })
        .then((res) => resolve(res))
        .catch((error) => {
          reject(error.response.data);
        });
    };
    checkRefreshToken();
  });
  //   console.log(res);
};

export default refreshToken;
