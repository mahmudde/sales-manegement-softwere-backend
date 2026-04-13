import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middlewWire/checkAuth";
import {
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  loginUserValidationSchema,
  registerUserValidationSchema,
  resetPasswordValidationSchema,
} from "./auth.validation";
import { validateRequest } from "../../middlewWire/validateRequest";
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
    { allowWithoutSubscription: true },
  ),
  authController.getMe,
);

router.post("/refresh-token", authController.getNewToken);

router.post(
  "/change-password",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
    { allowWithoutSubscription: true },
  ),
  validateRequest(changePasswordValidationSchema),
  authController.changePassword,
);

router.post(
  "/logout",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
    { allowWithoutSubscription: true },
  ),
  authController.logOutUser,
);

router.post(
  "/forgot-password",
  validateRequest(forgotPasswordValidationSchema),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  validateRequest(resetPasswordValidationSchema),
  authController.resetPassword,
);

export const authRoutes = router;
