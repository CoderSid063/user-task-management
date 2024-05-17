const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/auth.middleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secure routes
/**
 * in logout i dont have user information.
 * verifyJWT middleware get the token from the cookies, i prev. sended during login.
 * then using that token verify the loginuser in DB.
 * add that user information in "request"
 */

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;
