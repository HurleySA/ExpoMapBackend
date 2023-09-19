/*
  Warnings:

  - A unique constraint covering the columns `[solicitationId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_solicitationId_key" ON "Event"("solicitationId");
