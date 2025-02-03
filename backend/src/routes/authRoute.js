const express = require("express");
const {
  userSignup,
  userSignin,
  userSignout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/signout", userSignout);

module.exports = router;
