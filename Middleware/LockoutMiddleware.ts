import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
const prisma = new PrismaClient();
const redis = new Redis();

export const lockoutMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
  
    redis.get(email, (err: Error | null | undefined, lockUntil: string | null | undefined) => {
      if (err) {
        return next(err);
      }
  
      if (lockUntil && Date.now() < Number(lockUntil)) {
        return res.status(403).json({ error: 'You are currently locked out. Please try again later.' });
      }
  
      // If user failed to login, increment the attempt count in Redis.
      redis.incr(`${email}:attempts`, (err, attempts) => {
        if (err) {
          return next(err);
        }
  
        // Check if attempts is defined
        if (attempts) {
          // If the user has failed to login 5 times, set lockout time in Redis.
          // Here 300 is the lockout duration in seconds (5 minutes).
          if (attempts > 5) {
            redis.set(email, Date.now() + 300 * 1000);
          }
        }
  
        next();
      });
    });
  };