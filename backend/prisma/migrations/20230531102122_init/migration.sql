/*
  Warnings:

  - You are about to drop the column `content` on the `question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sectionId,text]` on the table `question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `text` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "question_sectionId_content_key";

-- AlterTable
ALTER TABLE "question" DROP COLUMN "content",
ADD COLUMN     "text" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "question_sectionId_text_key" ON "question"("sectionId", "text");
