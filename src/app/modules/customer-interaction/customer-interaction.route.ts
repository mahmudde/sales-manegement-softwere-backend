import { Router } from "express";

import { OrgRole } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middlewWire/checkAuth";
import { validateRequest } from "../../middlewWire/validateRequest";
import { customerInteractionController } from "./customer-interaction.controller";
import {
  createContactMessageValidationSchema,
  createDemoRequestValidationSchema,
  createNewsletterSubscriberValidationSchema,
  createSupportTicketValidationSchema,
  updateContactMessageStatusValidationSchema,
  updateDemoRequestStatusValidationSchema,
  updateSupportTicketStatusValidationSchema,
} from "./customer-interaction.validation";

const router = Router();

const adminRoles = [
  OrgRole.ORG_SUPER_ADMIN,
  OrgRole.ORG_ADMIN,
  OrgRole.SHOP_ADMIN,
];

router.post(
  "/contact",
  validateRequest(createContactMessageValidationSchema),
  customerInteractionController.createContactMessage,
);

router.get(
  "/contact-messages",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  customerInteractionController.getContactMessages,
);

router.patch(
  "/contact-messages/:id/status",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  validateRequest(updateContactMessageStatusValidationSchema),
  customerInteractionController.updateContactMessageStatus,
);

router.post(
  "/demo-requests",
  validateRequest(createDemoRequestValidationSchema),
  customerInteractionController.createDemoRequest,
);

router.get(
  "/demo-requests",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  customerInteractionController.getDemoRequests,
);

router.patch(
  "/demo-requests/:id/status",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  validateRequest(updateDemoRequestStatusValidationSchema),
  customerInteractionController.updateDemoRequestStatus,
);

router.post(
  "/newsletter",
  validateRequest(createNewsletterSubscriberValidationSchema),
  customerInteractionController.createNewsletterSubscriber,
);

router.post(
  "/support-tickets",
  validateRequest(createSupportTicketValidationSchema),
  customerInteractionController.createSupportTicket,
);

router.get(
  "/support-tickets",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  customerInteractionController.getSupportTickets,
);

router.patch(
  "/support-tickets/:id/status",
  checkAuth(...adminRoles, { allowWithoutSubscription: true }),
  validateRequest(updateSupportTicketStatusValidationSchema),
  customerInteractionController.updateSupportTicketStatus,
);

export const customerInteractionRoutes = router;
