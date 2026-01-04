export async function useAuthFetch(url:string, options:RequestInit) {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        const headers = {
            "Authorization": `Bearer ${user.access_token}`,
            ...options.headers,
        };
        const response = await fetch(`${api_url}${url}`, {
            ...options,
            headers,
        });
        return response;
}