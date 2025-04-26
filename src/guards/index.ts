import authService from "../services/auth.service";


export const isLogined = () : boolean => {
  const isExpired = authService.isExpired();
  if(isExpired) return false;
  return true;
};