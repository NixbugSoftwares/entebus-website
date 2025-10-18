import apiCall from "./apiConfig";


// service trace api call
export const serviceTraceGetApi = (params: any) => {
    return apiCall("get", "/company/service/location", params);
}

// landmark api call 
export const landmarkGetApi = (params: any) => {
    return apiCall("get", "/landmark", params);
}

// company api call
export const companyGetApi = (params: any) => {
    return apiCall("get", "/company", params);
}

// bus api call
export const busGetApi = (params: any) => {
    return apiCall("get", "/company/bus", params);
}

// service api call
export const serviceGetApi = (params: any) => {
    return apiCall("get", "/company/service", params);
}



// business api call
export const businessGetApi = (params: any) => {
    return apiCall("get", "/business", params);
}   