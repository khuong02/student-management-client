import methodApi from "../api/methodApi";

const refreshToken = async (account) => {
  const res = await methodApi.post("/api/user/token", { account });
  //   console.log(res);
  return res;
};

export default refreshToken;
