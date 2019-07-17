const router = require("express").Router();
const regValidate = require("../../config/validate/register");
const loginValidate = require("../../config/validate/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

router.post("/register", (req, res) => {
  const { errors, isValid } = regValidate(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      return res.status(400).json({ userName: "Username already exist" });
    }
    const { firstName, lastName, userName, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.error(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidate(req.body);
  if (!isValid) res.status(400).json(errors);

  User.findOne({ userName: req.body.userName })
    .then(user => {
      if (!user) {
        res.status(400).json({ msg: "User not found" });
      }

      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, userName: user.userName };
          jwt.sign(
            payload,
            process.env.JWTSECERT,
            { expiresIn: "1day" },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        } else {
          res.status(400).json({ passwordIncorrect: "Password incorrect" });
        }
      });
    })
    .catch(err => console.error(err));
});

module.exports = router;
