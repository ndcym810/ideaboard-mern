import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// create a rate limiter allows 10 requests per 20 seconds
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "20s"),
});

export default limiter;
