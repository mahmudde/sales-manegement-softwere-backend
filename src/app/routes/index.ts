import { Router } from "express";
import { authRouts } from "../modules/auth/auth.route";
import { organizationRoutes } from "../modules/organization/organization.route";
import { shopRoutes } from "../modules/shop/shop.route";

const router = Router();

router.use("/auth", authRouts);
router.use("/organizations", organizationRoutes);
router.use("/shops", shopRoutes);

export const indexRoutes = router;
