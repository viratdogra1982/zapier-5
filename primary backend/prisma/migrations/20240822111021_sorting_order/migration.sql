-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "sortingOrder" INTEGER NOT NULL DEFAULT 0;
