const Redis = require("ioredis");

const redisURL = process.env.REDIS_URL || "rediss://red-cr6u6788fa8c73820bag:3XKPhqbWLrJLgaARqMqpB3cRA0T1fM4l@singapore-redis.render.com:6379"


//singleton pattern
class RedisDB {
  static instance = null;

  static getInstance() {
    if (RedisDB.instance == null) {
      RedisDB.instance = new Redis(redisURL);
    }
    return RedisDB.instance;
  }
}

module.exports = RedisDB.getInstance();