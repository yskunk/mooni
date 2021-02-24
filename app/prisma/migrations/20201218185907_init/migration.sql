-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'EXECUTED');

-- CreateTable
CREATE TABLE "UsdlayerOrder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "executedAt" TIMESTAMP(3),
    "status" "OrderStatus" NOT NULL DEFAULT E'PENDING',
    "ethAddress" TEXT NOT NULL,
    "inputAmount" TEXT NOT NULL,
    "inputCurrency" TEXT NOT NULL,
    "outputAmount" TEXT NOT NULL,
    "outputCurrency" TEXT NOT NULL,
    "ethAmount" TEXT NOT NULL,
    "bityOrderId" TEXT,
    "referralId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ethAddress" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsdlayerOrder.bityOrderId_unique" ON "UsdlayerOrder"("bityOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "User.ethAddress_unique" ON "User"("ethAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User.referralId_unique" ON "User"("referralId");

-- AddForeignKey
ALTER TABLE "UsdlayerOrder" ADD FOREIGN KEY("ethAddress")REFERENCES "User"("ethAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsdlayerOrder" ADD FOREIGN KEY("referralId")REFERENCES "User"("referralId") ON DELETE SET NULL ON UPDATE CASCADE;
