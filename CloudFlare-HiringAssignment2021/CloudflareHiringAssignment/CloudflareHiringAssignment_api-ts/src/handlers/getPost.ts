/**
 * This function gets a specific post off Cloudflare KV
 * Runtime API is used since concurrent access will still not affect GET
 * @param request 
 * @returns 
 */
const getPost = async (request: any) => {
  const postId = request.params.id // retrieve id parameter from URL using itty router 
  // return JSON post (object) as (string)
  const body = JSON.stringify(await POSTS_KV.get(postId))
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  }
  return new Response(body, { headers })
}

export default getPost