import { Router } from "express";

import { checkAuth } from "../../middlewWire/checkAuth";
import { staffController } from "./staff.controller";
import {
  createStaffValidationSchema,
  updateStaffStatusValidationSchema,
  updateStaffValidationSchema,
} from "./staff.validation";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.post(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(createStaffValidationSchema),
  staffController.createStaff,
);

router.get(
  "/",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  staffController.getAllStaff,
);

router.get(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  staffController.getSingleStaff,
);

router.patch(
  "/:id",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateStaffValidationSchema),
  staffController.updateStaff,
);

router.patch(
  "/:id/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  validateRequest(updateStaffStatusValidationSchema),
  staffController.updateStaffStatus,
);

export const staffRoutes = router;
