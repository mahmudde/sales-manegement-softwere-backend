import { Router } from "express";

import { dashboardController } from "./dashboard.controller";
import { checkAuth } from "../../middlewWire/checkAuth";
import { OrgRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/overview",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  dashboardController.getDashboardOverview,
);

router.get(
  "/sales-analytics",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  dashboardController.getSalesAnalytics,
);

router.get(
  "/top-products",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  dashboardController.getTopSellingProducts,
);

router.get(
  "/low-stock",
  checkAuth(
    OrgRole.ORG_SUPER_ADMIN,
    OrgRole.ORG_ADMIN,
    OrgRole.SHOP_ADMIN,
    OrgRole.STAFF,
  ),
  dashboardController.getLowStockProducts,
);

export const dashboardRoutes = router;
