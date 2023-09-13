
interface IEventSolicitation {
    id: string
    eventName: string,
    typeEntrance: 'FREE' | 'PAID' | 'HYBRID',
    emailAdmin: string,
    phoneAdmin: string,
    detailsEvent: string,
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}
interface ICreateSolicitation {
    "eventName": string;
    "typeEntrance": 'FREE' | 'PAID' | 'HYBRID';
    "emailAdmin": string;
    "phoneAdmin": string;
    "detailsEvent": string;
}

interface IUpdateSolicitation {
    "eventName"?: string;
    "typeEntrance"?: 'FREE' | 'PAID' | 'HYBRID';
    "emailAdmin"?: string;
    "phoneAdmin"?: string;
    "detailsEvent"?: string;
}

export { ICreateSolicitation, IUpdateSolicitation, IEventSolicitation };