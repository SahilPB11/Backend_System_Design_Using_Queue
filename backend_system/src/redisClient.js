import redis from "redis";


const createRedisClient = await redis.createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect().then(console.log("Redis client connected"));

export default createRedisClient;