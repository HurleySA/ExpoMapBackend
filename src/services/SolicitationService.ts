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

import { AppError } from "../erros/AppError";

class SolicitationService {
    async deleteSolicitation(solicitation_id: string): Promise<any> {
       return true;
    }
    async updateSolicitation(solicitation_id: string, {eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent}:any): Promise<any> {
        return true;
    }
    
    async listSolicitations():Promise<any> {
        return true;
    }
    async createSolicitation({ eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent }: any): Promise<any>{
      
        return true;
    }
}

export { SolicitationService };