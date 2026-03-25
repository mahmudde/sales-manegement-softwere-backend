import { Router } from "express";

import { checkAuth } from "../../middlewWire/checkAuth";

import { storageController } from "./storage.controller";
import {
  createStorageValidationSchema,
  updateStorageStatusValidationSchema,
  updateStorageValidationSchema,
} from "./storage.validation";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(createStorageValidationSchema),
  storageController.createStorage,
);

router.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  storageController.getAllStorages,
);

router.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  storageController.getSingleStorage,
);

router.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateStorageValidationSchema),
  storageController.updateStorage,
);

router.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateStorageStatusValidationSchema),
  storageController.updateStorageStatus,
);

export const storageRoutes = router;
