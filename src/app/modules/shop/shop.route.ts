import { Router } from "express";

import { checkAuth } from "../../middlewWire/checkAuth";

import { shopController } from "./shop.controller";
import {
  createShopValidationSchema,
  updateShopStatusValidationSchema,
  updateShopValidationSchema,
} from "./shop.validation";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(createShopValidationSchema),
  shopController.createShop,
);

router.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  shopController.getAllShops,
);

router.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  shopController.getSingleShop,
);

router.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateShopValidationSchema),
  shopController.updateShop,
);

router.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateShopStatusValidationSchema),
  shopController.updateShopStatus,
);

export const shopRoutes = router;
