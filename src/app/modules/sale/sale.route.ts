import { Router } from "express";
import { checkAuth } from "../../middlewWire/checkAuth";
import { saleController } from "./sale.controller";
import { createSaleValidationSchema } from "./sale.validation";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.post(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  validateRequest(createSaleValidationSchema),
  saleController.createSale,
);

router.get(
  "/",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  saleController.getAllSales,
);

router.get(
  "/:id",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  saleController.getSingleSale,
);

export const saleRoutes = router;
