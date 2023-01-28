import { getCurrentUser } from "./getCurrentUser";

export function isAuthenticated() {
  const user = getCurrentUser();
  if (user) {
    return true;
  }
  return false;
}
