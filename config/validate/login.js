const validator = require("validator");
const isEmpty = require("is-empty");

const loginValidate = data => {
  let errors = {};
  let { userName, password } = data;

  userName = !isEmpty(userName) ? userName : "";
  password = !isEmpty(password) ? password : "";

  //User Name check
  if (validator.isEmpty(userName)) {
    errors.userName = "Field is required";
  } else if (!validator.isLength(userName, { min: 3 })) {
    errors.userName = "Username must be atleast 3 charcters";
  }

  //Password
  if (validator.isEmpty(password)) {
    errors.password = "Field is required";
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be greater than 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = loginValidate;
