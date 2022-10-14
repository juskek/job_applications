import { handleRequest } from './handler'
// entry point of API
// worker listens for fetch event, which invokes a Request object as one of its properties
// responds to the event by calling handleRequest from handler.ts
// and passing it event's Request object

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
