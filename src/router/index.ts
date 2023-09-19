import { Router } from "express";
import { solicitationRoutes } from "./solicitation.routes";
import { eventRoutes } from "./event.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/solicitation", solicitationRoutes);
router.use("/user", userRoutes);
router.use("/event", eventRoutes);


export default router;