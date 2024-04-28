/*
  Warnings:

  - Added the required column `provider` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "provider" TEXT NOT NULL;
