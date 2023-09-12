import { Router } from "express";
import { solicitationRoutes } from "./solicitation.routes";

const router = Router();

router.use("/solicitation", solicitationRoutes);


export default router;