export const PASSWORDLENGTH = {
  MIN: 6,
  MAX: 20,
};
export const USERNAMELENGTH = {
  MIN: 2,
  MAX: 50,
};

export default {
  PASSWORDLENGTH,
  USERNAMELENGTH,
};
export type PasswordLength = typeof PASSWORDLENGTH;
export type UsernameLength = typeof USERNAMELENGTH;