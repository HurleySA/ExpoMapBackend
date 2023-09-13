import { Router } from "express";
import { EventController } from "../controller/EventController";

const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.get('/', eventController.listEvent)
eventRoutes.post('/', eventController.createEvent)
eventRoutes.get('/:event_id', eventController.getEvent)
eventRoutes.put('/:event_id', eventController.updateEvent)
eventRoutes.delete('/:event_id', eventController.deleteEvent);


export { eventRoutes };