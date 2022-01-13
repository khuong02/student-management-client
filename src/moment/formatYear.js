import moment from "moment";

export const formatYear = (date) => {
  return moment(date).format("YYYY");
};
