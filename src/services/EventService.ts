import { prismaClient } from "../database/prismaClient";
import { AppError } from "../erros/AppError";
import { ICreateEvent, IUpdateEvent } from "../helpers/dto";
import { schemaCreateEvent, schemaUpdateEvent } from "../helpers/schemas";

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
        schedules}: ICreateEvent): Promise<any>{
        const validation = schemaCreateEvent.validate({ name,
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
            schedules },{
            abortEarly:false
        })
        if(validation.error) {
            throw new AppError(validation.error.message, 400);
        }

        const solicitationById = await prismaClient.eventSolicitation.findUnique({
            where:{
                id: solicitationId
            }
        })

        if(!solicitationById) {
            throw new AppError("Solicitation not found", 404);
        }

        const event = await prismaClient.event.create({
            data:{
                name,
                solicitationId,
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
             },
             include: {
                schedules: {
                    include: {
                        shows: true
                      }
                }

            }
         })
         if(!event){
             throw new AppError("Solicitation not found.", 404);
         }
         const validation = schemaUpdateEvent.validate({name,
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
            schedules}, {
             abortEarly:false
         });
         if(validation.error) {
             throw new AppError(validation.error.message, 400);
            }
        if(event.addressId) {
            const eventAddress = await prismaClient.address.findUnique({
                where:{
                id: event.addressId
                    }
                })
            if(!eventAddress){
                throw new AppError("Address not found.", 404);
            }
            
            await prismaClient.address.update({
                where: { id: event.addressId},
                data: {
                    city,
                    state,
                    street,
                    neighborhood,
                    number: number?.toString(),
                    latitude,
                    longitude,
                }
            })   
        }
      
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
             include: {
                schedules: {
                    include: {
                        shows: true
                      }
                },
                Address: true
            }
         })

         if(schedules) {
            const newEventWithNewSchedule = await prismaClient.event.update({
                where: { id: event_id },
                data: { 
                    schedules:{
                        create:
                        
                        schedules.map((schedule) => ({
                            date: schedule.date,
                            shows:{
                                create: schedule.shows.map((show) => ({
                                    band: show.band,
                                    hour: show.hour,
                                }))
                            }
                        }))
                    }
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
            return newEventWithNewSchedule;
        }
         return newEvent;
     }
}

export { EventService };