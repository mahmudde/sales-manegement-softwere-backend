import { Router } from "express";
import { checkAuth } from "../../middlewWire/checkAuth";
import { saleController } from "./sale.controller";
import {
  addSalePaymentValidationSchema,
  cancelSaleValidationSchema,
  createSaleValidationSchema,
} from "./sale.validation";
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

router.post(
  "/:id/payments",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN),
  validateRequest(addSalePaymentValidationSchema),
  saleController.addSalePayment,
);

router.get(
  "/:id/payments",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  saleController.getSalePayments,
);

router.patch(
  "/:id/cancel",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, OrgRole.SHOP_ADMIN),
  validateRequest(cancelSaleValidationSchema),
  saleController.cancelSale,
);

export const saleRoutes = router;
