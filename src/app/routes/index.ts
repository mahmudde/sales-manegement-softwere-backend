import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { organizationRoutes } from "../modules/organization/organization.route";
import { shopRoutes } from "../modules/shop/shop.route";
import { staffRoutes } from "../modules/staff/staff.route";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { storageRoutes } from "../modules/storage/storage.route";
import { inventoryRoutes } from "../modules/inventory/inventory.route";
import { saleRoutes } from "../modules/sale/sale.route";
import { billingRoutes } from "../modules/billing/billing.route";
import { dashboardRoutes } from "../modules/dashboard/dashboard.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/organizations", organizationRoutes);
router.use("/shops", shopRoutes);
router.use("/staff", staffRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/storages", storageRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/sales", saleRoutes);
router.use("/billing", billingRoutes);
router.use("/dashboard", dashboardRoutes);

export const indexRoutes = router;
