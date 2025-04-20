/*
  Warnings:

  - You are about to drop the column `intPhoneNum` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `vicinity` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "intPhoneNum",
DROP COLUMN "vicinity";
