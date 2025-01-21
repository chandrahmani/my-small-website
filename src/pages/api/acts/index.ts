
import { NextApiRequest, NextApiResponse } from 'next';
import actors from '../../../data/actors.json'

export type Data = {
  name: string;
  image: string;
  movies: string[];
  bio: string;
  number: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // @ts-ignore
  res.status(200).json(actors)
}
