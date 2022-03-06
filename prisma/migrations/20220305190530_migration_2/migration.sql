/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "passwordHash" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Ledger" (
    "ledgerId" SERIAL NOT NULL,
    "usersUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("ledgerId")
);

-- CreateTable
CREATE TABLE "LedgerRecord" (
    "ledgerRecordId" SERIAL NOT NULL,
    "associatedOutgoingId" INTEGER NOT NULL,
    "associatedIncomingId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerRecord_pkey" PRIMARY KEY ("ledgerRecordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_usersUserId_fkey" FOREIGN KEY ("usersUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerRecord" ADD CONSTRAINT "LedgerRecord_associatedOutgoingId_fkey" FOREIGN KEY ("associatedOutgoingId") REFERENCES "Ledger"("ledgerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerRecord" ADD CONSTRAINT "LedgerRecord_associatedIncomingId_fkey" FOREIGN KEY ("associatedIncomingId") REFERENCES "Ledger"("ledgerId") ON DELETE RESTRICT ON UPDATE CASCADE;
