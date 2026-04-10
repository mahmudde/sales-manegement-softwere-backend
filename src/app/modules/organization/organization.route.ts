import { Router } from "express";

import { organizationController } from "./organization.controller";
import { checkAuth } from "../../middlewWire/checkAuth";

import { updateOrganizationValidationSchema } from "./organization.validation";
import { multerUpload } from "../../config/multer.config";
import { OrgRole } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middlewWire/validateRequest";

const router = Router();

router.get(
  "/me",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  organizationController.getMyOrganization,
);

router.patch(
  "/me",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN),
  multerUpload.single("logo"),
  validateRequest(updateOrganizationValidationSchema),
  organizationController.updateMyOrganization,
);

export const organizationRoutes = router;
