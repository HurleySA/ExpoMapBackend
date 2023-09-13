
import { Request, Response } from "express";
import { AppError } from "../erros/AppError";
import { ICreateSolicitation, IUpdateSolicitation } from "../helpers/dto"; 
import { SolicitationService } from "../services/SolicitationService";

const solicitationService = new SolicitationService();

export class SolicitationController {
    async deleteSolicitation(request: Request, response: Response):Promise<Response> {
        try{
            const { solicitation_id }  = request.params;
            const solicitation = await solicitationService.deleteSolicitation(solicitation_id);
            return response.status(200).send(solicitation);
        
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
    async updateSolicitation(request: Request, response: Response):Promise<Response>{
        try{
            const { solicitation_id }  = request.params;
            const data: IUpdateSolicitation = request.body;
            const solicitation = await solicitationService.updateSolicitation(solicitation_id, data);
            return response.status(200).send(solicitation);
            
      
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
    async listSolicitations(request: Request, response: Response): Promise<Response> {
        try{
            const solicitations = await solicitationService.listSolicitations();
            return response.status(200).send(solicitations);
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

    async getSolicitation(request: Request, response: Response): Promise<Response> {
        try{
            const { solicitation_id }  = request.params;
            const solicitation = await solicitationService.getSolicitation(solicitation_id);
            return response.status(200).send(solicitation);
        
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
    async createSolicitation(request: Request, response: Response): Promise<Response> {
        try{
            const  { eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent }: ICreateSolicitation = request.body;
            const solicitation = await solicitationService.createSolicitation({eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent})
            return response.status(201).send(solicitation);
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