import { Router } from "express";
import { solicitationRoutes } from "./solicitation.routes";
import { eventRoutes } from "./event.routes";

const router = Router();

router.use("/solicitation", solicitationRoutes);
router.use("/event", eventRoutes);


export default router;