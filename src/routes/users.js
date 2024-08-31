var express = require("express");
var router = express.Router();

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const loggedIn = require("../middleware/auth");
/* POST /api/users/register  */
router.post("/register", async function (req, res, next) {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "You have been registered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* POST /api/users/login  */
router.post("/login", async function (req, res, next) {
  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser && (await foundUser.matchPassword(req.body.password))) {
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,

      maxAge: 8640000,
    });
    res.status(200).json({ _id: foundUser._id, name: foundUser.name });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

/*POST /api/users/logout */
router.post("/logout", loggedIn, function (req, res, next) {
  res.clearCookie("jwt");
  res.status(200).json({ message: "You have been logged out" });
});

module.exports = router;
