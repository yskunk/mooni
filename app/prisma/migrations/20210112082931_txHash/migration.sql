/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[txHash]` on the table `UsdlayerOrder`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "UsdlayerOrder" ADD COLUMN     "txHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UsdlayerOrder.txHash_unique" ON "UsdlayerOrder"("txHash");
