/*
  Warnings:

  - The primary key for the `TierList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TierListItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TierListRow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `TierList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TierListItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `TierListRow` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TierListItem" DROP CONSTRAINT "TierListItem_rowId_fkey";

-- DropForeignKey
ALTER TABLE "TierListRow" DROP CONSTRAINT "TierListRow_tierListId_fkey";

-- AlterTable
ALTER TABLE "TierList" DROP CONSTRAINT "TierList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "TierList_id_seq";

-- AlterTable
ALTER TABLE "TierListItem" DROP CONSTRAINT "TierListItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "rowId" SET DATA TYPE TEXT;
DROP SEQUENCE "TierListItem_id_seq";

-- AlterTable
ALTER TABLE "TierListRow" DROP CONSTRAINT "TierListRow_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "tierListId" SET DATA TYPE TEXT;
DROP SEQUENCE "TierListRow_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "TierList_id_key" ON "TierList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TierListItem_id_key" ON "TierListItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TierListRow_id_key" ON "TierListRow"("id");

-- AddForeignKey
ALTER TABLE "TierListRow" ADD CONSTRAINT "TierListRow_tierListId_fkey" FOREIGN KEY ("tierListId") REFERENCES "TierList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TierListItem" ADD CONSTRAINT "TierListItem_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "TierListRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
