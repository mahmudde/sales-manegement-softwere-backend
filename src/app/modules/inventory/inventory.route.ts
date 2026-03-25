import { Router } from "express";

import { checkAuth } from "../../middlewWire/checkAuth";

import { inventoryController } from "./inventory.controller";
import {
  stockInValidationSchema,
  stockOutValidationSchema,
} from "./inventory.validation";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.post(
  "/stock-in",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(stockInValidationSchema),
  inventoryController.stockIn,
);

router.post(
  "/stock-out",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(stockOutValidationSchema),
  inventoryController.stockOut,
);

router.get(
  "/transactions",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  inventoryController.getInventoryTransactions,
);

router.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  inventoryController.getSingleInventory,
);

router.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  inventoryController.getAllInventory,
);

export const inventoryRoutes = router;
