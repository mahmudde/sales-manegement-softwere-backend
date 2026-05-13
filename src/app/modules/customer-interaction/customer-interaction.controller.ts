import { Request, Response } from "express";
import status from "http-status";

import { LeadStatus, DemoRequestStatus, SupportTicketStatus } from "../../../generated/prisma/client";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { customerInteractionService } from "./customer-interaction.service";

const createContactMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await customerInteractionService.createContactMessage(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Contact message submitted successfully",
    data: result,
  });
});

const getContactMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await customerInteractionService.getContactMessages(req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Contact messages fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateContactMessageStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await customerInteractionService.updateContactMessageStatus(
      req.params.id as string,
      req.body.status as LeadStatus,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Contact message status updated successfully",
      data: result,
    });
  },
);

const createDemoRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await customerInteractionService.createDemoRequest(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Demo request submitted successfully",
    data: result,
  });
});

const getDemoRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await customerInteractionService.getDemoRequests(req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Demo requests fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateDemoRequestStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await customerInteractionService.updateDemoRequestStatus(
      req.params.id as string,
      req.body.status as DemoRequestStatus,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Demo request status updated successfully",
      data: result,
    });
  },
);

const createNewsletterSubscriber = catchAsync(
  async (req: Request, res: Response) => {
    const result = await customerInteractionService.createNewsletterSubscriber(
      req.body.email,
    );

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Newsletter subscription saved successfully",
      data: result,
    });
  },
);

const createSupportTicket = catchAsync(async (req: Request, res: Response) => {
  const result = await customerInteractionService.createSupportTicket(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Support ticket submitted successfully",
    data: result,
  });
});

const getSupportTickets = catchAsync(async (req: Request, res: Response) => {
  const result = await customerInteractionService.getSupportTickets(req.query);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Support tickets fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateSupportTicketStatus = catchAsync(
  async (req: Request, res: Response) => {
    const result = await customerInteractionService.updateSupportTicketStatus(
      req.params.id as string,
      req.body.status as SupportTicketStatus,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Support ticket status updated successfully",
      data: result,
    });
  },
);

export const customerInteractionController = {
  createContactMessage,
  getContactMessages,
  updateContactMessageStatus,
  createDemoRequest,
  getDemoRequests,
  updateDemoRequestStatus,
  createNewsletterSubscriber,
  createSupportTicket,
  getSupportTickets,
  updateSupportTicketStatus,
};
