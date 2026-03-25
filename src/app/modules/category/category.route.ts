import { Router } from "express";

import { checkAuth } from "../../middlewWire/checkAuth";

import { categoryController } from "./category.controller";
import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from "./category.validation";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(createCategoryValidationSchema),
  categoryController.createCategory,
);

router.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  categoryController.getAllCategories,
);

router.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  categoryController.getSingleCategory,
);

router.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateCategoryValidationSchema),
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  categoryController.deleteCategory,
);

export const categoryRoutes = router;
