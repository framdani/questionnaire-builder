/*
  Warnings:

  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questionnaire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_questionnaireId_fkey";

-- DropTable
DROP TABLE "question";

-- DropTable
DROP TABLE "questionnaire";

-- DropTable
DROP TABLE "section";

-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "questionnaireId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_name_key" ON "Questionnaire"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Section_questionnaireId_name_key" ON "Section"("questionnaireId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Question_sectionId_content_key" ON "Question"("sectionId", "content");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
