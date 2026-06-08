const dotenv = require("dotenv");
const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");

dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

module.exports = ratelimit;