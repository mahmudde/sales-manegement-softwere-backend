export interface IDashboardOverview {
  summary: {
    totalShops: number;
    totalStaff: number;
    totalProducts: number;
    totalStorages: number;
    totalInventoryRecords: number;
    lowStockProducts: number;
  };
  sales: {
    todaySalesCount: number;
    todaySalesAmount: number;
    monthlySalesCount: number;
    monthlySalesAmount: number;
  };
  recentSales: {
    id: string;
    invoiceNumber: string;
    totalAmount: number;
    paidAmount: number;
    dueAmount: number;
    createdAt: Date;
    shop: {
      id: string;
      name: string;
    } | null;
    createdBy: {
      id: string;
      name: string;
      email: string;
    } | null;
  }[];
  recentInventoryTransactions: {
    id: string;
    type: string;
    quantity: number;
    note: string | null;
    createdAt: Date;
    product: {
      id: string;
      name: string;
      sku: string;
    } | null;
    shop: {
      id: string;
      name: string;
    } | null;
    storage: {
      id: string;
      name: string;
    } | null;
    createdBy: {
      id: string;
      name: string;
      email: string;
    } | null;
  }[];
}
