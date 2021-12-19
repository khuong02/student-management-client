import methodApi from "../api/methodApi";

const refreshToken = async (account) => {
  return new Promise((resolve, reject) => {
    const checkRefreshToken = async () => {
      try {
        const res = await methodApi.post(`/api/user/token`, { account });
        if (res.status === 403) reject(res.data.msg);
        resolve(res.data);
      } catch (err) {
        console.log(err);
      }
      //   if (res.status === 403) ;
    };
    checkRefreshToken();
  });
};

export default refreshToken;
