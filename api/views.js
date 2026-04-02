import { Redis } from '@upstash/redis';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  try {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';

    if (!url || !token) {
      return res.json({ count: 0 });
    }

    const redis = new Redis({ url, token });

    if (req.method === 'POST') {
      const count = await redis.incr('pageviews');
      return res.json({ count });
    }

    const count = (await redis.get('pageviews')) || 0;
    return res.json({ count });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
