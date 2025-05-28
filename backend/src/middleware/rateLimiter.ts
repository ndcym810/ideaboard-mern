import { NextFunction, Request, Response, RequestHandler } from "express";
import limiter from "../config/upstash.js";

const rateLimiter: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // my-limit-key would be the user's IP address/username/etc.
    const { success } = await limiter.limit("my-limit-key");

    if (!success) {
      res.status(429).json({
        message: "Too many requests, please try again later.",
      });
      return;
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

export default rateLimiter;
