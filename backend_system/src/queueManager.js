import redis from "redis";
const client = redis.createClient();

export const enqueueRequest = async (userId, request) => {
  return new Promise((resolve, reject) => {
    client.rPush(userId, JSON.stringify(request), (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};

export const dequeueRequest = async (userId) => {
  return new Promise((resolve, reject) => {
    client.lPop(userId, (err, res) => {
      if (err) return reject(err);
      resolve(JSON.parse(res));
    });
  });
};
