import axios from "axios";


const baseURL = "https://api.entebus.com/public";
const apiCall = async (
    method: "get" | "post" | "patch" | "delete",
    endpoint: string,
    params= {},
    contentType = "application/json"
) => {
    try {
        const apiConfig = {
            method,
            url: `${baseURL}${endpoint}`,
            headers: {
                "Content-Type": contentType,
            },
            data: method !== "get" ? params : undefined,
            params: method === "get" ? params : undefined,
            paramsSerializer: (params: Record<string, unknown>) => {
                return Object.entries(params)
                    .flatMap(([key, value]) => {
                        if (value === undefined || value === null) return [];
                        return Array.isArray(value)
                            ? value.map((v) => `${key}=${encodeURIComponent(v)}`)
                            : [`${key}=${encodeURIComponent(String(value))}`];
                    })
                    .join("&");
            },
        }
        const response = await axios(apiConfig);
        return response;
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}

export default apiCall