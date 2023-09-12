import { Router } from "express";
import { SolicitationController } from "../controller/SolicitationController";

const solicitationRoutes = Router();

const solicitationController = new SolicitationController();

solicitationRoutes.post('/', solicitationController.createSolicitation)
solicitationRoutes.get('/', solicitationController.listSolicitations)
solicitationRoutes.put('/:solicitation_id', solicitationController.updateSolicitation)
solicitationRoutes.delete('/:solicitation_id', solicitationController.deleteSolicitation);


export { solicitationRoutes };