/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Ledger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `Ledger` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Ledger" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordHash" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_uuid_key" ON "Ledger"("uuid");
