
const redis = require("./redisDB");

async function main() {
    const user = {
      name: "Bob",
      age: 20,
      description: "I am a programer"
    }

    await redis.hset("user-hash", user);

    const name = await redis.hget("user-hash", "name");
    console.log(">>>name:::", name);

    const age = await redis.hget("user-hash", 'age');
    console.log(">>>age:::", age);

    const all = await redis.hgetall('user-hash');
    console.log(all);

    await redis.hdel("user-hash", ["name", "description"]);
    
    const exists = await redis.hexists("user-hash", "name");
    console.log(">>>exists:::", exists);

    await redis.hincrby("user-hash", "age", 10);
    const newAge = await redis.hget("user-hash", "age");
    console.log(newAge);

    await redis.hsetnx("user-hash", "age", 23);
    console.log(await redis.hget("user-hash", "age")); // 21
    
}

main();