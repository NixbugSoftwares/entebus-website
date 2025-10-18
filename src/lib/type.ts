export interface Bus {
    id: number,
    name: string
}

export interface Service {
    id: number,
    name: string,
    bus_id: number,
    route?: {
        landmark?: Landmark[];
    };
    landmarkIds?: number[];
}

export interface Landmark {
    landmark_id: number,
    name: string
    id: number
}

export interface ServiceTrace {
    id: number,
    landmark_id: number
}




