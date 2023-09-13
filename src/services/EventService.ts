import { prismaClient } from "../database/prismaClient";
import { AppError } from "../erros/AppError";
import { ICreateEvent, IUpdateEvent } from "../helpers/dto";

class EventService {
    async listEvents():Promise<any> {
        const events = await prismaClient.event.findMany({
            include:{
                schedules: {
                    include: {
                        shows: true
                      }
                },
                Address: true
            }});
        return events;
    }

    async getEvent(event_id: string): Promise<any>{
        const event = await prismaClient.event.findUnique({
            where:{
                id:event_id
            },
            include: {
                schedules: {
                    include: {
                        shows: true
                      }
                },
                Address: true
            }
        })
        if(!event){
            throw new AppError("Event not found.", 404);
        }
        return event;
    }

    async createEvent({name,
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
        schedules}: ICreateEvent): Promise<any>{
       /*  const validation = schemaCreateSolicitation.validate({ eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent },{
            abortEarly:false
        })
        if(validation.error) {
            throw new AppError(validation.error.message, 400);
        } */
        const event = await prismaClient.event.create({
            data:{
                name,
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
                Address: {
                    create: {
                        city,
                        state,
                        street,
                        neighborhood,
                        number: number.toString(),
                        latitude,
                        longitude,
                    }
                },
                schedules:{
                    create: schedules.map((schedule) => ({
                        date: schedule.date,
                        shows:{
                            create: schedule.shows.map((show) => ({
                                band: show.band,
                                hour: show.hour,
                            }))
                        }
                    }))
                }
            }
        })    
        return event;
    }

    async deleteEvent(event_id: string): Promise<any> {
        const event = await prismaClient.event.findUnique({
             where:{
                 id:event_id
             }
         })
         if(!event){
             throw new AppError("Event not found.", 404);
         }
 
         const newEvent = await prismaClient.event.delete({
             where: { id: event_id }
         })
         return newEvent;
     }
     async updateEvent(event_id: string, {name,
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
        schedules}:IUpdateEvent): Promise<any> {
         const event = await prismaClient.event.findUnique({
             where:{
                 id:event_id
             }
         })
         if(!event){
             throw new AppError("Solicitation not found.", 404);
         }
       /*   const validation = schemaUpdateSolicitation.validate({eventName, typeEntrance, phoneAdmin,emailAdmin, detailsEvent, status}, {
             abortEarly:false
         });
         if(validation.error) {
             throw new AppError(validation.error.message, 400);
         } */

         const newEvent = await prismaClient.event.update({
             where: { id: event_id },
             data: { 
                name,
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
             },
         })
         return newEvent;
     }
}

export { EventService };