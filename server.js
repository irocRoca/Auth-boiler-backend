const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoute = require("./routes/api/auth");
const passport = require("passport");
const verifyToken = require("./config/middleware");

const app = express();
require("dotenv").config();

//Passport Config
app.use(passport.initialize());
require("./config/passport/passport")(passport);

app.use(express.json());

//Routes
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connected"));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
