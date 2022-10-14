// handle route

/**
 * This function gets all posts off Cloudflare KV
 * Runtime API is used since concurrent access will still not affect GET
 * @returns 
 */
const getPostsNew = async () : Promise<Response> => {
  // get no of keys in KV
  const keysInfo = await POSTS_KV.list()
  const keys = keysInfo.keys
  const noKeys = keys.length
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  }
  if (noKeys == null) {
    // no keys
    return new Response(JSON.stringify("No keys in POSTS_KV"), {status: 200, headers: headers})
  } else {
    const posts:any[] = []
    // iterate over keys
    for (let i = 0; i < noKeys; i++) {
      const resp = await POSTS_KV.get(String(keys[i].name))
      // do not append keys with null
      if (resp != null) {
        posts.push(resp)
      }
    }
    
    return new Response(JSON.stringify(posts), { status: 200, headers: headers })
  }
}

export default getPostsNew