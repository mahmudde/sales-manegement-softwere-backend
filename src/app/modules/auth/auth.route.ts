import { Router } from "express";
import { authController } from "./auth.controller";

import {
  changePasswordValidationSchema,
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "./auth.validation";
import { validateRequest } from "../../middlewWire/validateRequest";
import { checkAuth } from "../../middlewWire/checkAuth";
import { OrgRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/register",
  validateRequest(registerUserValidationSchema),
  authController.registerUser,
);

router.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  authController.loginUser,
);

router.get(
  "/me",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  authController.getMe,
);

router.post("/refresh-token", authController.getNewToken);

router.post(
  "/change-password",
  checkAuth(),
  validateRequest(changePasswordValidationSchema),
  authController.changePassword,
);

router.post("/logout", checkAuth(), authController.logOutUser);

export const authRouts = router;
