-- CreateTable
CREATE TABLE "User" (
    "address" STRING NOT NULL,
    "nonce" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
