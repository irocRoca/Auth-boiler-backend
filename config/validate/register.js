const validator = require("validator");
const isEmpty = require("is-empty");

const registerValidate = data => {
  let errors = {};
  let { firstName, lastName, userName, email, password, password2 } = data;

  firstName = !isEmpty(firstName) ? firstName : "";
  lastName = !isEmpty(lastName) ? lastName : "";
  userName = !isEmpty(userName) ? userName : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  password2 = !isEmpty(password2) ? password2 : "";

  //First Name check
  if (validator.isEmpty(firstName)) {
    errors.firstName = "Field is required";
  } else if (!validator.isLength(firstName, { min: 3 })) {
    errors.firstName = "First name must be longer than 3 characters";
  }

  //Last Name check
  if (validator.isEmpty(lastName)) {
    errors.lastName = "Field is required";
  } else if (!validator.isLength(lastName, { min: 3 }))
    errors.lastName = "Last name must be longer than 3 characters";

  //User Name check
  if (validator.isEmpty(userName)) {
    errors.userName = "Field is required";
  } else if (!validator.isLength(userName, { min: 3 })) {
    errors.userName = "Username must be atleast 3 charcters";
  }

  //Email
  if (validator.isEmpty(email)) {
    errors.email = "Field is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  //Password
  if (validator.isEmpty(password)) {
    errors.password = "Field is required";
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.password = "Password must be greater than 6 characters";
  }

  //Confirm password
  if (validator.isEmpty(password2)) {
    errors.password2 = "Field is required";
  } else if (!validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = registerValidate;
