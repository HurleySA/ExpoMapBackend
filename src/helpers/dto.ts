interface ICreateSolicitation {
    "eventName": string;
    "typeEntrance": 'free' | 'paid' | 'hybrid';
    "emailAdmin": string;
    "phoneAdmin": string;
    "detailsEvent": string;
}

interface IUpdateSolicitation {
    "eventName"?: string;
    "typeEntrance"?: 'free' | 'paid' | 'hybrid';
    "emailAdmin"?: string;
    "phoneAdmin"?: string;
    "detailsEvent"?: string;
}

export { ICreateSolicitation, IUpdateSolicitation };