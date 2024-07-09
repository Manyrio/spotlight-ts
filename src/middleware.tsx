import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Creating the response object
    const response = NextResponse.next();
    // Extracting the path and search parameters from the request URL
    const path = req.nextUrl.pathname;

    let searchParamsObj: any = {};
    //@ts-ignore
    for (const [key, value] of req.nextUrl.searchParams) {
        searchParamsObj[key] = value;
    }

    response.headers.append("path", path);
    if (searchParamsObj) {
        response.headers.append("searchParams", JSON.stringify(searchParamsObj));
    } else {
        // Optionally handle the case where there are no search parameters
        response.headers.append("searchParams", "");
    }

    return response;
}
