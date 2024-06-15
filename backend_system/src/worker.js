import { dequeueRequest } from "./queueManager.js";

export const processQueue = async (userId) => {
  while (true) {
    const request = await dequeueRequest(userId);
    if (request) {
      // Process the request
      console.log(`Processing request for user ${userId}:`, request);
      try {
        // Simulate processing time (replace with actual request processing logic)
        await simulateProcessing(request);
        console.log(`Request processed successfully for user ${userId}:`, request);
      } catch (error) {
        console.error(`Error processing request for user ${userId}:`, error);
        // Handle error or retry logic if needed
      }
    } else {
      // No more requests in the queue
      break;
    }
  }
};

const simulateProcessing = async (request) => {
  // Simulate processing time (replace with actual processing logic)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, Math.random() * 5000); // Simulate processing time up to 5 seconds
  });
};
