-- CreateEnum
CREATE TYPE "SalePaymentStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "dueAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "paidAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "paymentStatus" "SalePaymentStatus" NOT NULL DEFAULT 'PAID';

-- CreateTable
CREATE TABLE "SalePayment" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "receivedById" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" "SalePaymentMethod" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SalePayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SalePayment_saleId_idx" ON "SalePayment"("saleId");

-- CreateIndex
CREATE INDEX "SalePayment_receivedById_idx" ON "SalePayment"("receivedById");

-- CreateIndex
CREATE INDEX "SalePayment_createdAt_idx" ON "SalePayment"("createdAt");

-- AddForeignKey
ALTER TABLE "SalePayment" ADD CONSTRAINT "SalePayment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalePayment" ADD CONSTRAINT "SalePayment_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
