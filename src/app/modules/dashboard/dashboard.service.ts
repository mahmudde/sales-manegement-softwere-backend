import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../auth/auth.interface";
import { OrgRole } from "../../../generated/prisma/enums";

const getAccessibleShopIds = async (user: IRequestUser) => {
  if (
    user.role === OrgRole.ORG_SUPER_ADMIN ||
    user.role === OrgRole.ORG_ADMIN
  ) {
    return null;
  }

  const assignments = await prisma.shopAssignment.findMany({
    where: {
      userId: user.userId,
      isActive: true,
      shop: {
        organizationId: user.organizationId,
        isDeleted: false,
      },
    },
    select: {
      shopId: true,
    },
  });

  return assignments.map((item) => item.shopId);
};

const getDashboardOverview = async (user: IRequestUser) => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(now);
  startOfTomorrow.setHours(24, 0, 0, 0);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const shopFilter =
    shopIds === null
      ? {}
      : {
          shopId: {
            in: shopIds,
          },
        };

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
    inventories,
  ] = await Promise.all([
    prisma.shop.count({
      where: {
        organizationId,
        isDeleted: false,
        ...(shopIds === null
          ? {}
          : {
              id: {
                in: shopIds,
              },
            }),
      },
    }),

    prisma.organizationMember.count({
      where: {
        organizationId,
        isActive: true,
        user: {
          isDeleted: false,
        },
        ...(shopIds === null
          ? {}
          : {
              user: {
                isDeleted: false,
                shopAssignments: {
                  some: {
                    shopId: {
                      in: shopIds,
                    },
                    isActive: true,
                  },
                },
              },
            }),
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
        ...shopFilter,
      },
    }),

    prisma.inventory.count({
      where: {
        organizationId,
        ...shopFilter,
      },
    }),

    prisma.sale.aggregate({
      where: {
        organizationId,
        ...shopFilter,
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
        ...shopFilter,
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
        ...shopFilter,
        createdAt: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
      },
    }),

    prisma.sale.count({
      where: {
        organizationId,
        ...shopFilter,
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),

    prisma.sale.findMany({
      where: {
        organizationId,
        ...shopFilter,
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
        ...shopFilter,
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

    prisma.inventory.findMany({
      where: {
        organizationId,
        ...shopFilter,
      },
      select: {
        quantity: true,
        lowStockThreshold: true,
      },
    }),
  ]);

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

const getSalesAnalytics = async (
  user: IRequestUser,
  period: "daily" | "monthly" = "daily",
) => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);

  const now = new Date();

  let startDate: Date;
  let mode: "daily" | "monthly";

  if (period === "monthly") {
    startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    mode = "monthly";
  } else {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);
    mode = "daily";
  }

  const shopFilter =
    shopIds === null
      ? {}
      : {
          shopId: {
            in: shopIds,
          },
        };

  const sales = await prisma.sale.findMany({
    where: {
      organizationId,
      ...shopFilter,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const grouped: Record<string, number> = {};

  for (const sale of sales) {
    const date = new Date(sale.createdAt);

    const key =
      mode === "daily"
        ? date.toISOString().split("T")[0]
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    grouped[key] = (grouped[key] || 0) + Number(sale.total);
  }

  return Object.entries(grouped).map(([label, total]) => ({
    label,
    total,
  }));
};

const getTopSellingProducts = async (user: IRequestUser) => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);

  const items = await prisma.saleItem.findMany({
    where: {
      sale: {
        organizationId,
        ...(shopIds === null
          ? {}
          : {
              shopId: {
                in: shopIds,
              },
            }),
      },
    },
    select: {
      productId: true,
      quantity: true,
      totalPrice: true,
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
        },
      },
    },
  });

  const grouped = new Map<
    string,
    {
      product: {
        id: string;
        name: string;
        sku: string;
      } | null;
      totalSold: number;
      revenue: number;
    }
  >();

  for (const item of items) {
    const existing = grouped.get(item.productId);

    if (existing) {
      existing.totalSold += item.quantity;
      existing.revenue += Number(item.totalPrice);
    } else {
      grouped.set(item.productId, {
        product: item.product,
        totalSold: item.quantity,
        revenue: Number(item.totalPrice),
      });
    }
  }

  return Array.from(grouped.values())
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);
};

const getLowStockProducts = async (user: IRequestUser) => {
  const organizationId = user.organizationId;
  const shopIds = await getAccessibleShopIds(user);

  const shopFilter =
    shopIds === null
      ? {}
      : {
          shopId: {
            in: shopIds,
          },
        };

  const inventories = await prisma.inventory.findMany({
    where: {
      organizationId,
      ...shopFilter,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          price: true,
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
    },
    orderBy: {
      quantity: "asc",
    },
  });

  return inventories
    .filter((item) => item.quantity <= item.lowStockThreshold)
    .map((item) => ({
      id: item.id,
      quantity: item.quantity,
      lowStockThreshold: item.lowStockThreshold,
      product: item.product,
      shop: item.shop,
      storage: item.storage,
    }));
};

export const dashboardService = {
  getDashboardOverview,
  getSalesAnalytics,
  getTopSellingProducts,
  getLowStockProducts,
};
