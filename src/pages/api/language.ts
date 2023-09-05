// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { language } from '../../interfaces/contentProps';

const data: language[] = [
  {
    id: "pt-br",
    name: "Português"
  },
  {
    id: "en",
    name: "English"
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query?.lang) res.status(200).json(data.filter(e => e.id === req.query.lang));
  else res.status(200).json(data);
}

