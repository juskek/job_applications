/**
 * Sorts array chronologically based on ISO date in published_at attribute
 * @param {*} array 
 * @returns 
 */
export const sortArrayChronologically = (array) => {
    return array.sort(function (a, b) {
        return JSON.parse(b).published_at.localeCompare(JSON.parse(a).published_at);
    });
}
/**
 * Posts value to Cloudflare KV with CORS
 * Origin set for local: http://127.0.0.1:3000
 * Origin set for deployment: 
 * Use dotenv in future
 * @param {*} newPost 
 */
export const postNewPost = async (newPost) => {
    const headers = {
        'Origin': 'http://127.0.0.1:3000',
        "Access-Control-Request-Method": "GET, POST",
        "Access-Control-Request-Headers": "Content-Type",
        'Content-Type': 'application/json',
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: headers
    }
    const resp = await fetch(
        "https://main.justinkek.workers.dev/api/posts", options
    );
    console.log("Request response: " + resp)
};
/**
 * Gets value from Cloudflare KV
 * @returns 
 */
export const getPosts = async () => {
    const headers = {
        'Origin': 'http://127.0.0.1:3000',
        "Access-Control-Request-Method": "GET, POST",
        "Access-Control-Request-Headers": "Content-Type",
        'Content-Type': 'application/json',
    }
    const options = {
        method: 'GET',
        headers: headers
    }
    const resp = await fetch(
        "https://main.justinkek.workers.dev/api/posts", options
    );
    return await resp.json(); // parse body text as JSON and convert to JS object

};