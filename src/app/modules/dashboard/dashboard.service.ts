import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../auth/auth.interface";

const getDashboardOverview = async (user: IRequestUser) => {
  const organizationId = user.organizationId;

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(now);
  startOfTomorrow.setHours(24, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalShops,
    totalStaff,
    totalProducts,
    totalStorages,
    totalInventoryRecords,

    todaySalesAggregate,
    monthlySalesAggregate,
    todaySalesCount,
    monthlySalesCount,

    recentSales,
    recentInventoryTransactions,
  ] = await Promise.all([
    prisma.shop.count({
      where: {
        organizationId,
        isDeleted: false,
      },
    }),

    prisma.organizationMember.count({
      where: {
        organizationId,
        isActive: true,
        user: {
          isDeleted: false,
        },
      },
    }),

    prisma.product.count({
      where: {
        organizationId,
        isDeleted: false,
      },
    }),

    prisma.storage.count({
      where: {
        organizationId,
        isDeleted: false,
      },
    }),

    prisma.inventory.count({
      where: {
        organizationId,
      },
    }),

    prisma.sale.aggregate({
      where: {
        organizationId,
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
      _sum: {
        total: true,
      },
    }),

    prisma.sale.aggregate({
      where: {
        organizationId,
        createdAt: {
          gte: startOfMonth,
        },
      },
      _sum: {
        total: true,
      },
    }),

    prisma.sale.count({
      where: {
        organizationId,
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    }),

    prisma.sale.count({
      where: {
        organizationId,
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),

    prisma.sale.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        invoiceNo: true,
        subtotal: true,
        discount: true,
        total: true,
        createdAt: true,
        shop: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),

    prisma.inventoryTransaction.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      select: {
        id: true,
        type: true,
        quantity: true,
        note: true,
        createdAt: true,
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
          },
        },
        shop: {
          select: {
            id: true,
            name: true,
          },
        },
        storage: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  const inventories = await prisma.inventory.findMany({
    where: {
      organizationId,
    },
    select: {
      quantity: true,
      lowStockThreshold: true,
    },
  });

  const lowStockProducts = inventories.filter(
    (item) => item.quantity <= item.lowStockThreshold,
  ).length;

  return {
    summary: {
      totalShops,
      totalStaff,
      totalProducts,
      totalStorages,
      totalInventoryRecords,
      lowStockProducts,
    },

    sales: {
      todaySalesCount,
      todaySalesAmount: Number(todaySalesAggregate._sum?.total ?? 0),
      monthlySalesCount,
      monthlySalesAmount: Number(monthlySalesAggregate._sum?.total ?? 0),
    },

    recentSales,
    recentInventoryTransactions,
  };
};

export const dashboardService = {
  getDashboardOverview,
};
