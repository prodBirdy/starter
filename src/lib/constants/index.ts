export const PASSWORDLENGTH = {
  MIN: 6,
  MAX: 20,
};
export const USERNAMELENGTH = {
  MIN: 2,
  MAX: 50,
};

export const MAX_FILE_SIZE = 500000;
export const CSV_TYPE = ["text/csv"];

export default {
  PASSWORDLENGTH,
  USERNAMELENGTH,
  MAX_FILE_SIZE,
  CSV_TYPE
};

export type PasswordLength = typeof PASSWORDLENGTH;
export type UsernameLength = typeof USERNAMELENGTH;
