
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

const schemaCreateEvent = Joi.object({
    name: Joi.string().required(),
    solicitationId: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().valid('AL', 'BA', 'PB', 'RN', 'CE', 'MA', 'PE', 'PI', 'SE').required(),
    street: Joi.string().required(),
    neighborhood: Joi.string().required(),
    number: Joi.alternatives().try(Joi.number(), Joi.valid('S/N')).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    openningHour: Joi.string().required(),
    closeHour: Joi.string().required(),
    typeEntrance: Joi.string().valid('FREE', 'PAID', 'HYBRID').required(),
    valueEntrance: Joi.when('typeEntrance', {
        is: Joi.string().valid('PAID', 'HYBRID'),
        then: Joi.number().required(),
        otherwise: Joi.number()
      }),
      startPaymentEntranceHour: Joi.when('typeEntrance', {
        is: Joi.string().valid('PAID', 'HYBRID'),
        then: Joi.string().required(),
        otherwise: Joi.string()
    }),
    emailAdmin: Joi.string().email().required(),
    phoneAdmin: Joi.string().required(),
    sponsors: Joi.array().items(Joi.string()).required(),
    hasLounge: Joi.boolean().required(),
    loungeBuyLink: Joi.when('hasLounge', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional()
    }),
    schedules: Joi.array().items(Joi.object({
        date: Joi.string().required(),
        shows: Joi.array().items(Joi.object({
            band: Joi.string().required(),
            hour: Joi.string(),
        }))
    })).required()
})

const schemaUpdateEvent = Joi.object({
    name: Joi.string(),
    city: Joi.string(),
    state: Joi.string().valid('AL', 'BA', 'PB', 'RN', 'CE', 'MA', 'PE', 'PI', 'SE'),
    street: Joi.string(),
    neighborhood: Joi.string(),
    number: Joi.alternatives().try(Joi.number(), Joi.valid('S/N')),
    latitude: Joi.number(),
    longitude: Joi.number(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    openningHour: Joi.string(),
    closeHour: Joi.string(),
    typeEntrance: Joi.string().valid('FREE', 'PAID', 'HYBRID'),
    valueEntrance: Joi.when('typeEntrance', {
        is: Joi.string().valid('PAID', 'HYBRID'),
        then: Joi.number().required(),
        otherwise: Joi.number()
      }),
      startPaymentEntranceHour: Joi.when('typeEntrance', {
        is: Joi.string().valid('PAID', 'HYBRID'),
        then: Joi.string().required(),
        otherwise: Joi.string()
    }),
    emailAdmin: Joi.string().email(),
    phoneAdmin: Joi.string(),
    sponsors: Joi.array().items(Joi.string()),
    hasLounge: Joi.boolean(),
    loungeBuyLink: Joi.when('hasLounge', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional()
    }),
    schedules: Joi.array().items(Joi.object({
        date: Joi.string().required(),
        shows: Joi.array().items(Joi.object({
            band: Joi.string().required(),
            hour: Joi.string(),
        }))
    }))
})

const schemaCreateUser = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean()
  });
  
  const schemaUpdateUser = Joi.object({
    password: Joi.string(),
    isAdmin: Joi.boolean()
  });
  

export { schemaCreateSolicitation, schemaUpdateSolicitation, schemaCreateEvent, schemaUpdateEvent, schemaCreateUser, schemaUpdateUser };
