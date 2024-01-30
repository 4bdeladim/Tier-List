-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TierList" (
    "id" SERIAL NOT NULL,
    "userEmail" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TierList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TierListRow" (
    "id" SERIAL NOT NULL,
    "tierListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TierListRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TierListItem" (
    "id" SERIAL NOT NULL,
    "rowId" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TierListItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "rowId_index" ON "TierListItem"("rowId");

-- AddForeignKey
ALTER TABLE "TierList" ADD CONSTRAINT "TierList_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TierListRow" ADD CONSTRAINT "TierListRow_tierListId_fkey" FOREIGN KEY ("tierListId") REFERENCES "TierList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TierListItem" ADD CONSTRAINT "TierListItem_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "TierListRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
