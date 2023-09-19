import { Router } from "express";
import { SolicitationController } from "../controller/SolicitationController";

const solicitationRoutes = Router();

const solicitationController = new SolicitationController();

solicitationRoutes.post('/', solicitationController.createSolicitation)
solicitationRoutes.get('/', solicitationController.listSolicitations)
solicitationRoutes.get('/:solicitation_id', solicitationController.getSolicitation)
solicitationRoutes.put('/:solicitation_id', solicitationController.updateSolicitation)
solicitationRoutes.delete('/:solicitation_id', solicitationController.deleteSolicitation);
solicitationRoutes.post('/:solicitation_id/accept', solicitationController.acceptSolicitation);


export { solicitationRoutes };