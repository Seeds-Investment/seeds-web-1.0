// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

interface Data {
  name: string;
}

export default function handler(res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}
