import { Router } from "express";
import { SolicitationController } from "../controller/SolicitationController";
import authMiddleware from "../middlewares/authMiddleware";

const solicitationRoutes = Router();

const solicitationController = new SolicitationController();

solicitationRoutes.post('/', solicitationController.createSolicitation)
solicitationRoutes.get('/',authMiddleware, solicitationController.listSolicitations)
solicitationRoutes.post('/exhibitor', solicitationController.createSolicitationExhibitor)
solicitationRoutes.get('/:solicitation_id',authMiddleware, solicitationController.getSolicitation)
solicitationRoutes.put('/:solicitation_id',authMiddleware, solicitationController.updateSolicitation)
solicitationRoutes.delete('/:solicitation_id',authMiddleware, solicitationController.deleteSolicitation);
solicitationRoutes.post('/:solicitation_id/accept',authMiddleware, solicitationController.acceptSolicitation);
solicitationRoutes.post('/:solicitation_id/reject',authMiddleware, solicitationController.rejectSolicitation);


export { solicitationRoutes };