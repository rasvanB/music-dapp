/*
  Warnings:

  - You are about to drop the `Widget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Widget";

-- CreateTable
CREATE TABLE "User" (
    "address" STRING NOT NULL,
    "nonce" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
