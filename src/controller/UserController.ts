import { Request, Response } from "express";
import { AppError } from "../erros/AppError";
import { UserService } from "../services/UserService";
import { ICreateUser, IUser } from "../helpers/dto";
import { StatusCodes } from "http-status-codes";

const userService = new UserService();

export class UserController {
    async createUser(request: Request, response: Response): Promise<Response> {
        try{
            const  { username, email, password, isAdmin }: ICreateUser = request.body;
            const user = await userService.createUser({ username, email, password, isAdmin })
            return response.status(StatusCodes.CREATED).send(user);
        }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }else if(err instanceof Error){
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: err.message});
            }
            const errorMessage = "Failed to do something exceptional"
                return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: errorMessage});
                
        }
      }

      async getUser(request: Request, response: Response): Promise<Response> {
        try {
          const id = request.params.user_id;
          const user = await userService.getUserById(id);
          return response.status(StatusCodes.OK).send(user);
        } catch (err) {
          if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
          return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
        }
      }

      async getAllUsers(request: Request, response: Response): Promise<Response> {
        try {
          const users = await userService.getAllUsers();
          return response.status(StatusCodes.OK).send(users);
        } catch (err) {
          if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
          return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
        }
      }

      async updateUser(request: Request, response: Response): Promise<Response> {
        try {
          const id = request.params.user_id;
          const updatedUser = await userService.updateUser(id, {
            ...(request.body as IUser)
          });
          return response.status(StatusCodes.OK).send(updatedUser);
        } catch (err) {
          if (err instanceof AppError) { return response.status(err.statusCode).json({ error: err.message }); }
          return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: err instanceof Error ? err.message : 'Failed to do something exceptional' });
        }
      }

      async deleteUser(request: Request, response: Response):Promise<Response> {
        try{
            const id  = request.params.user_id;
            const event = await userService.deleteUser(id);
            return response.status(StatusCodes.OK).send(event);
          }catch(err){
            if(err instanceof AppError){
                return response.status(err.statusCode).json({error: err.message});
            }else if(err instanceof Error){
                return response.status(500).json({error: err.message});
            }
            const errorMessage = "Failed to do something exceptional"
                return response.status(500).json({error: errorMessage});
          }
    }
}