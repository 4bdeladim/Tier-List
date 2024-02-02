/*
  Warnings:

  - Added the required column `bg` to the `TierListRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TierListRow" ADD COLUMN     "bg" TEXT NOT NULL;
