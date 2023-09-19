
//Solicitation
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

//Events

interface IEvent {
    id: string
    name: string,
    address: IAddress,
    startDate: string,
    endDate: string,
    openningHour: string,
    closeHour: string,
    typeEntrance: 'free' | 'paid' | 'hybrid'
    valueEntrance?: number,
    startPaymentEntranceHour?: string,
    emailAdmin: string,
    phoneAdmin: string,
    sponsors: string[],
    hasLounge: boolean,
    loungeBuyLink?: string,
    schedules: ISchedule[]
}

interface IAddress {
    city: string,
    state: 'AL' | 'BA' | 'PB' | 'RN' | 'CE' | 'MA' | 'PE' | 'PI' | 'SE',
    street: string,
    neighborhood: string,
    number: number | 'S/N',
    latitude: number,
    longitude: number
}

interface ISchedule {
    date: string,
    shows: IShow[]
}

interface IShow {
    band: string,
    hour?: string 
}

interface ICreateEvent {
    name: string;
    solicitationId: string
    city: string,
    state: 'AL' | 'BA' | 'PB' | 'RN' | 'CE' | 'MA' | 'PE' | 'PI' | 'SE',
    street: string,
    neighborhood: string,
    number: number | 'S/N',
    latitude: number,
    longitude: number,
    startDate: string,
    endDate: string,
    openningHour: string,
    closeHour: string,
    typeEntrance: 'FREE' | 'PAID' | 'HYBRID',
    valueEntrance?: number,
    startPaymentEntranceHour?: string,
    emailAdmin: string,
    phoneAdmin: string,
    sponsors: string[],
    hasLounge: boolean,
    loungeBuyLink?: string,
    schedules: ISchedule[]
}
interface IUpdateEvent {
    name?: string;
    city?: string,
    state?: 'AL' | 'BA' | 'PB' | 'RN' | 'CE' | 'MA' | 'PE' | 'PI' | 'SE',
    street?: string,
    neighborhood?: string,
    number?: number | 'S/N',
    latitude?: number,
    longitude?: number,
    startDate?: string,
    endDate?: string,
    openningHour?: string,
    closeHour?: string,
    typeEntrance?: 'FREE' | 'PAID' | 'HYBRID',
    valueEntrance?: number,
    startPaymentEntranceHour?: string,
    emailAdmin?: string,
    phoneAdmin?: string,
    sponsors?: string[],
    hasLounge?: boolean,
    loungeBuyLink?: string,
    schedules?: ISchedule[]
}

//User
export interface IUser {
    username: string
    email: string
    password: string
    isAdmin: boolean
}
export interface ICreateUser {
    username: string
    email: string
    password: string
    isAdmin: boolean
}
export interface UpdateUser {
    username: string
    email: string
    password: string
    isAdmin: boolean
}

export { ICreateSolicitation, IUpdateSolicitation, IEventSolicitation, IEvent, ICreateEvent, IUpdateEvent };