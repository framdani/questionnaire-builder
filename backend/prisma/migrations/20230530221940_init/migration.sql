/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Questionnaire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_questionnaireId_fkey";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Questionnaire";

-- DropTable
DROP TABLE "Section";

-- CreateTable
CREATE TABLE "questionnaire" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "questionnaireId" INTEGER NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "questionnaire_name_key" ON "questionnaire"("name");

-- CreateIndex
CREATE UNIQUE INDEX "section_questionnaireId_name_key" ON "section"("questionnaireId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "question_sectionId_content_key" ON "question"("sectionId", "content");

-- AddForeignKey
ALTER TABLE "section" ADD CONSTRAINT "section_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
