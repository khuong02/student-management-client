import moment from "moment";

export const formatDefaultPropsInput = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
