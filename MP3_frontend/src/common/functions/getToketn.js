import { getCurrentUser } from "./getCurrentUser";

export const getToken = () => {
  const user = getCurrentUser();
  let token = "";
  if (user && user.token) {
    token = user.token;
  }

  return token;
};
