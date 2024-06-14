import {  dequeueRequest } from "./queueManager";

export const processQueue = async (userId) => {
  while (true) {
    const request = await dequeueRequest(userId);
    if (request) {
      // Process the request
      console.log(`Processing request for user ${userId}:`, request);
      // Add your request handling logic here
    } else {
      // No more requests in the queue
      break;
    }
  }
};


