/* 
import { VaccineSchedule } from "@prisma/client";
import { endOfDay, startOfDay, subHours } from "date-fns";
import { prismaClient } from "../database/prismaClient";
import { AppError } from "../erros/AppError";
import { ICreateVaccineSchedule, IUpdateVaccineSchedule } from "../helpers/dto";
import { schemaCreate, schemaUpdate } from "../helpers/schemas";

let availableHours: number[] = [];
for(let i = +process.env.FIRST_HOUR_SERVICE!; i <= +process.env.LAST_HOUR_SERVICE!; i++){
    availableHours.push(i);
}
 */

import { prismaClient } from "../database/prismaClient";
import { AppError } from "../erros/AppError";
import { ICreateSolicitation, IEventSolicitation } from "../helpers/dto";
import { schemaCreateSolicitation, schemaUpdateSolicitation } from "../helpers/schemas";

class SolicitationService {
    async deleteSolicitation(solicitation_id: string): Promise<any> {
       const solicitation = await prismaClient.eventSolicitation.findUnique({
            where:{
                id:solicitation_id
            }
        })
        if(!solicitation){
            throw new AppError("Solicitation not found.", 404);
        }

        const newSolicitation = await prismaClient.eventSolicitation.delete({
            where: { id: solicitation_id }
        })
        return newSolicitation;
    }
    async updateSolicitation(solicitation_id: string, {eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent, status}:any): Promise<any> {
        const solicitation = await prismaClient.eventSolicitation.findUnique({
            where:{
                id:solicitation_id
            }
        })
        if(!solicitation){
            throw new AppError("Solicitation not found.", 404);
        }
        const validation = schemaUpdateSolicitation.validate({eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent, status}, {
            abortEarly:false
        });
        if(validation.error) {
            throw new AppError(validation.error.message, 400);
        }
        const newSolicitation = await prismaClient.eventSolicitation.update({
            where: { id: solicitation_id },
            data: { 
                eventName, 
                typeEntrance, 
                phoneAdmin,
                emailAdmin, 
                detailsEvent, 
                status
            },
        })
        return newSolicitation;
    }
    
    async listSolicitations():Promise<any> {
        const solicitations = await prismaClient.eventSolicitation.findMany();
        return solicitations;
    }

    async getSolicitation(solicitation_id: string): Promise<IEventSolicitation>{
        const solicitation = await prismaClient.eventSolicitation.findUnique({
            where:{
                id:solicitation_id
            }
        })
        if(!solicitation){
            throw new AppError("Solicitation not found.", 404);
        }
        return solicitation;
    }

    async createSolicitation({ eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent }: ICreateSolicitation): Promise<IEventSolicitation>{
        const validation = schemaCreateSolicitation.validate({ eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent },{
            abortEarly:false
        })
        if(validation.error) {
            throw new AppError(validation.error.message, 400);
        }
        const solicitation = await prismaClient.eventSolicitation.create({
            data:{
                eventName,
                typeEntrance, 
                phoneAdmin,
                emailAdmin, 
                detailsEvent
            }
        })    
        return solicitation;
    }
}

export { SolicitationService };