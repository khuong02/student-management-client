export const usersValidation = (account) => {
  const regex = /^0([0-9]{9})@caothang.edu.vn$/gm;

  return regex.test(account);
};
