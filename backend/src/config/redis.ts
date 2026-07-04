import Redis from 'ioredis';
import { env } from './env';

let redis: Redis;

try {
  redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null, // needed for BullMQ
    lazyConnect: true,
  });

  redis.on('connect', () => {
    console.log('⚡ Connected to Redis successfully.');
  });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });
} catch (err) {
  console.error('Failed to create Redis client:', err);
  process.exit(1);
}

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect();
  } catch (err) {
    console.error('Failed to establish initial connection to Redis:', err);
  }
}

export function setRedisClient(client: Redis) {
  redis = client;
}

export { redis };
export default redis;
