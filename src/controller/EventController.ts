import { EventService } from "../services/EventService";
import { Request, Response } from "express";
import { AppError } from "../erros/AppError";
import { ICreateEvent, IUpdateEvent } from "../helpers/dto";

const eventService = new EventService();

export class EventController {
    async listEvent(request: Request, response: Response): Promise<Response> {
        try{
            const events = await eventService.listEvents();
            return response.status(200).send(events);
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

    async getEvent(request: Request, response: Response): Promise<Response> {
        try{
            const { event_id }  = request.params;
            const event = await eventService.getEvent(event_id);
            return response.status(200).send(event);
        
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
    async getEventBySolicitationId(request: Request, response: Response): Promise<Response> {
        try{
            const { solicitation_id }  = request.params;
            const event = await eventService.getEventBySolicitationId(solicitation_id);
            return response.status(200).send(event);
        
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

    async createEvent(request: Request, response: Response): Promise<Response> {
        try{
            const  { 
                name,
                solicitationId,
                city,
                state,
                street,
                neighborhood,
                number,
                latitude,
                longitude,
                startDate,
                endDate,
                openningHour,
                closeHour,
                typeEntrance,
                valueEntrance,
                startPaymentEntranceHour,
                emailAdmin,
                phoneAdmin,
                sponsors,
                hasLounge,
                loungeBuyLink,
                schedules }: ICreateEvent = request.body;
            const event = await eventService.createEvent({
                name,
                solicitationId,
                city,
                state,
                street,
                neighborhood,
                number,
                latitude,
                longitude,
                startDate,
                endDate,
                openningHour,
                closeHour,
                typeEntrance,
                valueEntrance,
                startPaymentEntranceHour,
                emailAdmin,
                phoneAdmin,
                sponsors,
                hasLounge,
                loungeBuyLink,
                schedules
            })
            return response.status(201).send(event);
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

    async deleteEvent(request: Request, response: Response):Promise<Response> {
        try{
            const { event_id }  = request.params;
            const event = await eventService.deleteEvent(event_id);
            return response.status(200).send(event);
        
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
    async updateEvent(request: Request, response: Response):Promise<Response>{
        try{
            const { event_id }  = request.params;
            const data: IUpdateEvent = request.body;
            const event = await eventService.updateEvent(event_id, data);
            return response.status(200).send(event);
            
      
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