export const validator = {
  isEmail: string =>
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      string
    ),
  notEmpty: string => string !== '',
  minLength: (data, length) => data.length >= length,
};
