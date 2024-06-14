import redis from "redis";
const client = redis.createClient();

async function enqueueRequest(userId, request) {
  return new Promise((resolve, reject) => {
    client.rpush(userId, JSON.stringify(request), (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

async function dequeueRequest(userId) {
  return new Promise((resolve, reject) => {
    client.lpop(userId, (err, res) => {
      if (err) return reject(err);
      resolve(JSON.parse(res));
    });
  });
}

module.exports = { enqueueRequest, dequeueRequest };
