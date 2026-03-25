import { Router } from "express";
import { authRouts } from "../modules/auth/auth.route";
import { organizationRoutes } from "../modules/organization/organization.route";
import { shopRoutes } from "../modules/shop/shop.route";
import { staffRoutes } from "../modules/staff/staff.route";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { storageRoutes } from "../modules/storage/storage.route";

const router = Router();

router.use("/auth", authRouts);
router.use("/organizations", organizationRoutes);
router.use("/shops", shopRoutes);
router.use("/staff", staffRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/storages", storageRoutes);

export const indexRoutes = router;
