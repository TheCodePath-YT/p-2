import express from "express";
import {
  updateUserPassword,
  userLogin,
  userRegisteration,
} from "./user.controller.js";
import { auth } from "../../middlewares/jwtAuth.js";
import { userLogout } from "./user.controller.js";

const router = express.Router();

router.route("/signup").post(userRegisteration);
router.route("/signin").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/update/password").post(auth, updateUserPassword);

export default router;
