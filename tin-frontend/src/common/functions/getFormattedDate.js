import moment from "moment";

export const getFormattedDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
