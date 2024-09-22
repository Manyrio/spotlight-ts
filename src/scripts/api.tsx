
export enum Method {
    post = "POST",
    get = "GET",
    patch = "PATCH",
    delete = "DELETE"
}

export async function call(url: string, method: Method, data: any = null, type: string | null = 'application/json', headers: any = {}) {
    if (type == "auto") {
        type = null
    }

    console.log("type", type)
    try {
        headers = {
            ...headers,
            "Cache-Control": "no-cache, no-store, must-revalidate", // These directives prevent caching
            "Pragma": "no-cache",  // This is specifically for older HTTP 1.0 caches
            "Expires": "0",  // Indicates the resource is already expired
            "cache": 'no-store'
        };

        if (type) headers['Content-Type'] = type


        headers.authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`


        if (!url.startsWith("http") && !url.startsWith("/")) {
            url = "https://admin.laube-lhomme-caulnes.notaires.fr/api/" + url
        } else {
            console.log("url", url)
        }

        const response = await fetch(url, {
            next: { revalidate: 0 },
            method: method,
            headers: headers,
            body: data ? type == "application/json" ? JSON.stringify(data) : data : null,
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
        console.log("url", url)
        throw error;
    }
}