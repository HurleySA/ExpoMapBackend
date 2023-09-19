import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get('/', userController.getAllUsers)
userRoutes.post('/', userController.createUser)
userRoutes.get('/:user_id', userController.getUser)
userRoutes.put('/:user_id', userController.updateUser)
userRoutes.delete('/:user_id', userController.deleteUser);


export { userRoutes };