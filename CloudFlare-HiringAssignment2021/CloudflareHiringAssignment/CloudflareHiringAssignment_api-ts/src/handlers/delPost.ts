import { endpoint,account,namespace,expiration,xAuthEmail,xAuthKey } from "../env"

const headers = {
  "X-Auth-Email": xAuthEmail,
  "X-Auth-Key": xAuthKey,
  'Access-Control-Allow-Origin': '*',
  "Content-Type": "application/json"
}
const keyURL = endpoint + account + namespace + "_noKeys" + expiration

/**
 * This function deletes a specific post off Cloudflare KV
 * It uses the runtime API since concurrent deletion will still lead to deletion of that key
 * @param request 
 * @returns 
 */
const delPost = async (request: any) => {
  const postId = request.params.id // retrieve id parameter from URL using itty router 
  const existing = JSON.stringify(await POSTS_KV.get(postId))
  if (existing != JSON.stringify(null)) {
    // delete kv
    await POSTS_KV.delete(postId)

    // update no of keys using HTTPS to prevent concurrent access
    const keyOptions = {
      method: 'PUT',
      body: JSON.stringify(Number(await POSTS_KV.get("_noKeys"))-1),
      headers: headers
    }
    await fetch(keyURL, keyOptions)
    
    return new Response('Successfully removed key-value:\n' + postId + " : "+ existing)
  } 
  return new Response('No such key.')
}

export default delPost