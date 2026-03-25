import { Router } from "express";
import { authRouts } from "../modules/auth/auth.route";
import { organizationRoutes } from "../modules/organization/organization.route";

const router = Router();

router.use("/auth", authRouts);
router.use("/organizations", organizationRoutes);

export const indexRoutes = router;
