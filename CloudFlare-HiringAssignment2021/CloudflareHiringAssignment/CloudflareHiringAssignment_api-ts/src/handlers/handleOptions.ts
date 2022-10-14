/**
 * This function handles CORS preflight requests
 * @param request 
 * @returns 
 */
const handleOptions = async (request:Request) : Promise<Response> => {
    // return new Response("Handle Options method called")
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Origin",
        "Access-Control-Max-Age": "86400",
        "Vary": "Accept-Encoding, Origin",
        'Content-Type':'text/plain'
    }

    if (request.headers.get("Origin") !== null &&
        request.headers.get("Access-Control-Request-Method") !== null &&
        request.headers.get("Access-Control-Request-Headers") !== null) {
        // Handle CORS pre-flight request.
        return new Response(null, {
            status: 204,
            headers: corsHeaders
        })
    } else {
        // Handle standard OPTIONS request.
        return new Response(null, {
            status: 204,
            headers: {
                "Allow": "GET, HEAD, POST, OPTIONS",
            }
        })
    }
}

export default handleOptions