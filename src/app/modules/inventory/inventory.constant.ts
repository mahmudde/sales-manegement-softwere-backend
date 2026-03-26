export const inventorySearchableFields = [
  "product.name",
  "product.sku",
  "shop.name",
  "storage.name",
];

export const inventoryFilterableFields = ["shopId", "storageId", "productId"];

export const inventorySortableFields = [
  "createdAt",
  "updatedAt",
  "quantity",
  "lowStockThreshold",
];

export const inventoryTransactionSearchableFields = [
  "product.name",
  "product.sku",
  "shop.name",
  "storage.name",
  "createdBy.name",
];

export const inventoryTransactionFilterableFields = [
  "shopId",
  "storageId",
  "productId",
  "type",
  "createdById",
];

export const inventoryTransactionSortableFields = [
  "createdAt",
  "quantity",
  "type",
];
