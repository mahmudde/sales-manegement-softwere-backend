import { Router } from "express";

import { checkAuth } from "../../middlewWire/checkAuth";
import { validateRequest } from "../../middlewWire/validateRequest";
import { billingController } from "./billing.controller";
import { createPaymentIntentValidationSchema } from "./billing.validation";
import { OrgRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/plans",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true,
  }),
  billingController.getBillingPlans,
);

router.post(
  "/create-payment-intent",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true,
  }),
  validateRequest(createPaymentIntentValidationSchema),
  billingController.createPaymentIntent,
);

router.get(
  "/status",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true,
  }),
  billingController.getBillingStatus,
);

router.get(
  "/history",
  checkAuth(OrgRole.ORG_SUPER_ADMIN, OrgRole.ORG_ADMIN, {
    allowWithoutSubscription: true,
  }),
  billingController.getBillingHistory,
);

// Stripe webhook should stay public
router.post("/webhook", billingController.stripeWebhook);

export const billingRoutes = router;
