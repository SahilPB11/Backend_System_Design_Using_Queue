import createRedisClient from "./redisClient.js";

export const enqueueRequest = async (userId, request) => {
  try {
    const client = await createRedisClient;
    const result = await client.RPUSH(userId, request)
    console.log("Request enqueued successfully:", result);
    return result;
  } catch (error) {
    console.error("Error enqueuing request:", error);
    throw error;
  }
};

export const dequeueRequest = async (userId) => {
  try {
    const client = await createRedisClient;
    const result = await client.LPOP(userId);
    console.log("Request dequeued successfully:", result);
    return result;
  } catch (error) {
    console.error("Error dequeuing request:", error);
    throw error;
  }
};
