import { NowRequest, NowResponse } from '@now/node'
import prisma from "../src/lib/api/prisma";
import {authMiddleware} from "../src/lib/api/authMiddleware";
import {Token} from "../src/lib/didManager";
import { errorMiddleware } from '../src/lib/api/errorMiddleware';

export default errorMiddleware(authMiddleware(async (req: NowRequest, res: NowResponse, token: Token): Promise<NowResponse | void> => {
  const ethAddress = token.claim.iss.toLowerCase();
  const orders = await prisma.mooniOrder.findMany({
    where: {
      ethAddress,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  res.json(orders)
}));
