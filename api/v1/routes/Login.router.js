const express = require("express");
const { login } = require("../controllers/user.controller");
const loginRouter = express.Router();

loginRouter.post("/login", login);
module.exports = loginRouter;
