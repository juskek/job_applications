import { endpoint,account,namespace,expiration,xAuthEmail,xAuthKey } from "../env"

/**
 * This function posts a new value to Cloudflare KV
 * HTTPS API is used since concurrent access will affect POST
 * @param request 
 * @returns 
 */
const postPostNew = async (request: Request): Promise<Response> => {
  
  // wait for body to get sent, convert to json and store
  const content:Record<string,unknown> = await request.json()
  const headers = {
    "X-Auth-Email": xAuthEmail,
    "X-Auth-Key": xAuthKey,
    "Content-Type": "application/json"
  }
  // use id as key
  const key = content.id
  const url = endpoint + account + namespace + key + expiration
  const postOptions = {
    method: 'PUT',
    body: JSON.stringify(content),
    headers: headers
  }
  // wait for store in KV, get response
  const response = await fetch(url, postOptions)


  // return notification
  return new Response("POST: " + JSON.stringify(response), {
    status: 200, headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    }
  })
  // return response
}

export default postPostNew