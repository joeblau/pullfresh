// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getStakes from "../../utils/getStakes";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { address } = req.query;
  const stakes = await getStakes(String(address));
  const json = JSON.parse(JSON.stringify(stakes));
  res.status(200).json(json);
}
