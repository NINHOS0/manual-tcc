// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { data } from '../../interfaces/contentApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiRes = await fetch("http://localhost:5000/content/pt-br", {method: "POST"}).then(res => res.json()).catch(err => console.log(err))
  res.status(200).json(req.query);
}

