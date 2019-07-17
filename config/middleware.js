const Jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const head = req.header("Authorization");

  if (!head) res.status(401).json({ error: "Access Denied" });
  try {
    const token = head.split(" ")[1];
    const decoded = Jwt.verify(token, process.env.JWTSECERT);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is invalid" });
  }
};

module.exports = verifyToken;
