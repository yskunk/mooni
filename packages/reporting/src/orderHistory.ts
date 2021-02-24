import { PrismaClient } from '../../../app/node_modules/.prisma/client';
import { BityOrderResponse } from '../../../app/src/lib/wrappers/bityTypes';
import { UsdlayerOrderStatus } from '../../../app/src/types/api';
import { AssetTransfersCategory, createAlchemyWeb3 } from '@alch/alchemy-web3';

import { readJSON } from './utils';

const prisma = new PrismaClient();
const web3 = createAlchemyWeb3('https://eth-mainnet.alchemyapi.io/v2/demo');

async function fetchOrderTx(bityOrder: BityOrderResponse) {
  const usdlayerOrder = await prisma.usdlayerOrder.findUnique({
    where: { bityOrderId: bityOrder.id },
  });
  if (!usdlayerOrder) throw new Error('usdlayerorder not found');
  if (usdlayerOrder.txHash) return;

  const transfers = await web3.alchemy.getAssetTransfers({
    fromBlock: web3.utils.numberToHex(11189980),
    fromAddress: usdlayerOrder.ethAddress,
    toAddress: bityOrder.payment_details.crypto_address,
    category: [AssetTransfersCategory.EXTERNAL],
  });
  const transfer = transfers.transfers[0];
  const { hash: txHash } = transfer;

  await prisma.usdlayerOrder.update({
    where: { bityOrderId: bityOrder.id },
    data: { txHash },
  });
}

async function createUsdlayerOrder(bityOrder: BityOrderResponse) {
  const rawUsdlayerOrder = {
    createdAt: bityOrder.timestamp_created,
    executedAt: bityOrder.timestamp_executed,
    inputAmount: bityOrder.input.amount,
    outputAmount: bityOrder.output.amount,
    inputCurrency: bityOrder.input.currency,
    outputCurrency: bityOrder.output.currency,
    bityOrderId: bityOrder.id,
    ethAmount: bityOrder.input.amount,
    status: 'EXECUTED' as UsdlayerOrderStatus,
    user: {
      connectOrCreate: {
        where: { ethAddress: bityOrder.input.crypto_address },
        create: { ethAddress: bityOrder.input.crypto_address },
      },
    },
  };

  await prisma.usdlayerOrder.create({
    data: rawUsdlayerOrder,
  });
}

async function run() {
  const orders = readJSON('./output/orders.json');

  for (let year of Object.keys(orders)) {
    const yearOrders = orders[year];
    for (let month of Object.keys(yearOrders)) {
      const monthOrders = Object.values(yearOrders[month]) as BityOrderResponse[];
      for (let order of monthOrders) {
        if (order.input) {
          console.log(order.id);
          await createUsdlayerOrder(order).catch(error => {
            if (error.code === 'P2002') return;
            throw error;
          });
          await fetchOrderTx(order);
        }
      }
    }
  }
}

run()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
