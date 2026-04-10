import { Router } from "express";

import { PlatformRole } from "../../../generated/prisma/client";
import { platformController } from "./platform.controller";
import { checkPlatformAuth } from "../../middlewWire/checkPlatformAuth";
import { validateRequest } from "../../middlewWire/validateRequest";
import { updateOrganizationStatusValidationSchema } from "./platform.validation";

const router = Router();

router.get(
  "/dashboard",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  platformController.getPlatformDashboard,
);

router.get(
  "/organizations",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  platformController.getAllOrganizations,
);

router.get(
  "/organizations/:id",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  platformController.getSingleOrganization,
);

router.patch(
  "/organizations/:id/status",
  checkPlatformAuth(PlatformRole.PLATFORM_SUPER_ADMIN),
  validateRequest(updateOrganizationStatusValidationSchema),
  platformController.updateOrganizationStatus,
);

export const platformRoutes = router;
