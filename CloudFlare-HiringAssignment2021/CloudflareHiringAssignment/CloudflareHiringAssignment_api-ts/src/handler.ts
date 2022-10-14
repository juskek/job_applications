import { Router } from 'itty-router'
// import routes 
import getPosts from './handlers/getPosts'
import getPost from './handlers/getPost'
import postPost from './handlers/postPost'
import delPost from './handlers/delPost'
import handleOptions from './handlers/handleOptions'

// instantiate Router class to handle requests
const router = Router()

// register routes which are called when the url path matches the registered path
router
  .options('/api/posts', handleOptions)
  .get('/api/posts', getPosts)
  .get('/api/posts/:id', getPost)
  .delete('/api/posts/:id', delPost)
  .post('/api/posts', postPost)
  .get('*', () => new Response("Not found", { status: 404 }))

// called during fetch event 
// takes request object and passes it to router's handle function
// Request has properties e.g., headers, body, method (GET, POST), url
// the router calls the appropriate function
export const handleRequest = (request: Request) : Response => router.handle(request) 

