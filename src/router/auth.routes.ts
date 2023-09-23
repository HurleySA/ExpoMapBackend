import { Router } from 'express';
import { AuthController } from '../controller/AuthController';

const authRoutes = Router();

const authControllerInstance = new AuthController();

authRoutes.post('/', authControllerInstance.authenticate);

export { authRoutes };