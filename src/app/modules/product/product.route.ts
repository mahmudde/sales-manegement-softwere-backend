import { Router } from "express";

import { checkAuth } from "../../middlewWire/checkAuth";

import { productController } from "./product.controller";
import {
  createProductValidationSchema,
  updateProductStatusValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(createProductValidationSchema),
  productController.createProduct,
);

router.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  productController.getAllProducts,
);

router.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  productController.getSingleProduct,
);

router.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateProductValidationSchema),
  productController.updateProduct,
);

router.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateProductStatusValidationSchema),
  productController.updateProductStatus,
);

export const productRoutes = router;
