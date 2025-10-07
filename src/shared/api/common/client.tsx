import axios from 'axios';

import { Env } from '@/shared/lib/env';

const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Example usage ----
// const res = await client.get('/api/some-endpoint');
// const res = await client.post('/api/some-endpoint', { foo: 'bar' });

export default client;
