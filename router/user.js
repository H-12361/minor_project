const express = require("express");
const router = express.Router();
const User = require("../modles/user");
const wrapAsync = require("../util/errorusingwrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {
  signup,
  rendersignupform,
  renderLoginFrom,
  login,
  logout,
} = require("../controllers/user");

router.get("/signup", rendersignupform);

router.post("/signup",wrapAsync(signup));

router.get("/login", renderLoginFrom);
router.post( "/login",
  saveRedirectUrl,
  passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);

router.get("/logout", logout);
module.exports = router;
