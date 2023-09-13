
import Joi from "joi";

const schemaCreateSolicitation = Joi.object({
    eventName: Joi.string().min(5).required(),
    typeEntrance: Joi.string().valid('FREE', 'PAID', 'HYBRID').required(),
    emailAdmin: Joi.string().email().required(),
    phoneAdmin: Joi.string().required(),
    detailsEvent: Joi.string().required()
})

const schemaUpdateSolicitation = Joi.object({
    eventName: Joi.string().min(5),
    typeEntrance: Joi.string().valid('FREE', 'PAID', 'HYBRID'),
    emailAdmin: Joi.string().email(),
    phoneAdmin: Joi.string(),
    detailsEvent: Joi.string(),
    status: Joi.string().valid('PENDING', 'ACCEPTED', 'REJECTED'),
})

export { schemaCreateSolicitation, schemaUpdateSolicitation };
