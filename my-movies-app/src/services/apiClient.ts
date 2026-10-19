import { API_URL, BearerToken } from "../env";

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const res = await fetch(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${BearerToken}`,
            Accept: "application/json",
            ...options?.headers,
        }
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();

}