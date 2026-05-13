import status from "http-status";

import AppError from "../../errorHelper/AppError";
import { IQueryParams } from "../../interfaces/query.interface";
import { prisma } from "../../lib/prisma";
import {
  DemoRequestStatus,
  LeadStatus,
  Prisma,
  SupportTicketStatus,
} from "../../../generated/prisma/client";

const getPagination = (query: IQueryParams) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const buildSearch = (searchTerm?: unknown) => {
  if (!searchTerm || typeof searchTerm !== "string") {
    return undefined;
  }

  return {
    contains: searchTerm,
    mode: "insensitive" as const,
  };
};

const createContactMessage = async (payload: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}) => {
  return prisma.contactMessage.create({
    data: payload,
  });
};

const getContactMessages = async (query: IQueryParams) => {
  const { page, limit, skip } = getPagination(query);
  const search = buildSearch(query.searchTerm);

  const where: Prisma.ContactMessageWhereInput = {
    ...(query.status ? { status: query.status as LeadStatus } : {}),
    ...(search
      ? {
          OR: [
            { name: search },
            { email: search },
            { company: search },
            { message: search },
          ],
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const updateContactMessageStatus = async (id: string, nextStatus: LeadStatus) => {
  const message = await prisma.contactMessage.findUnique({ where: { id } });

  if (!message) {
    throw new AppError(status.NOT_FOUND, "Contact message not found");
  }

  return prisma.contactMessage.update({
    where: { id },
    data: { status: nextStatus },
  });
};

const createDemoRequest = async (payload: {
  name: string;
  email: string;
  phone?: string;
  company: string;
  businessType?: string;
  teamSize?: string;
  preferredDate?: string;
  message?: string;
}) => {
  return prisma.demoRequest.create({
    data: {
      ...payload,
      preferredDate: payload.preferredDate
        ? new Date(payload.preferredDate)
        : undefined,
    },
  });
};

const getDemoRequests = async (query: IQueryParams) => {
  const { page, limit, skip } = getPagination(query);
  const search = buildSearch(query.searchTerm);

  const where: Prisma.DemoRequestWhereInput = {
    ...(query.status ? { status: query.status as DemoRequestStatus } : {}),
    ...(search
      ? {
          OR: [
            { name: search },
            { email: search },
            { company: search },
            { businessType: search },
            { message: search },
          ],
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.demoRequest.count({ where }),
    prisma.demoRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const updateDemoRequestStatus = async (
  id: string,
  nextStatus: DemoRequestStatus,
) => {
  const demoRequest = await prisma.demoRequest.findUnique({ where: { id } });

  if (!demoRequest) {
    throw new AppError(status.NOT_FOUND, "Demo request not found");
  }

  return prisma.demoRequest.update({
    where: { id },
    data: { status: nextStatus },
  });
};

const createNewsletterSubscriber = async (email: string) => {
  return prisma.newsletterSubscriber.upsert({
    where: { email },
    update: { isActive: true },
    create: { email },
  });
};

const createSupportTicket = async (payload: {
  name: string;
  email: string;
  subject: string;
  category: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  message: string;
}) => {
  return prisma.supportTicket.create({
    data: payload,
  });
};

const getSupportTickets = async (query: IQueryParams) => {
  const { page, limit, skip } = getPagination(query);
  const search = buildSearch(query.searchTerm);

  const where: Prisma.SupportTicketWhereInput = {
    ...(query.status ? { status: query.status as SupportTicketStatus } : {}),
    ...(query.category ? { category: String(query.category) } : {}),
    ...(search
      ? {
          OR: [
            { name: search },
            { email: search },
            { subject: search },
            { category: search },
            { message: search },
          ],
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.supportTicket.count({ where }),
    prisma.supportTicket.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

const updateSupportTicketStatus = async (
  id: string,
  nextStatus: SupportTicketStatus,
) => {
  const ticket = await prisma.supportTicket.findUnique({ where: { id } });

  if (!ticket) {
    throw new AppError(status.NOT_FOUND, "Support ticket not found");
  }

  return prisma.supportTicket.update({
    where: { id },
    data: { status: nextStatus },
  });
};

export const customerInteractionService = {
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
