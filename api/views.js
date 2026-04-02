import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method === 'POST') {
    const count = await redis.incr('pageviews');
    return res.json({ count });
  }

  const count = (await redis.get('pageviews')) || 0;
  return res.json({ count });
}
