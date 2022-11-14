/*
  Warnings:

  - You are about to drop the `Anouncement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Anouncement";

-- CreateTable
CREATE TABLE "Announcement" (
    "AnnouncementID" UUID NOT NULL,
    "Title" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Tag" TEXT NOT NULL,
    "OwnerID" UUID,
    "Public" BOOLEAN NOT NULL DEFAULT false,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "UpdateBy" UUID,
    "Viewer" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("AnnouncementID")
);
