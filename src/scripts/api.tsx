
export enum Method {
    post = "POST",
    get = "GET",
    patch = "PATCH",
    delete = "DELETE"
}

export async function call(url: string, method: Method, data: any = null, type = 'application/json', headers: any = {}) {

    try {
        headers = {
            ...headers,
            'Content-Type': type,
            "Cache-Control": "no-cache, no-store, must-revalidate", // These directives prevent caching
            "Pragma": "no-cache",  // This is specifically for older HTTP 1.0 caches
            "Expires": "0",  // Indicates the resource is already expired
            "cache": 'no-store'
        };

        headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`


        if (!url.startsWith("http") && !url.startsWith("/")) {
            url = "https://adminpreview.hicards.fr/api/" + url
        }



        const response = await fetch(url, {
            next: { revalidate: 0 },
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null,
        });

        // Try to parse as JSON first
        let result;
        if (response.headers.get('content-type')?.includes('application/json')) {
            result = await response.json();
        } else {
            result = await response.text();
        }

        // Check if the response was not OK after parsing the data
        if (!response.ok) {
            throw result;
        }

        return result;

    } catch (error) {
        throw error;
    }
}