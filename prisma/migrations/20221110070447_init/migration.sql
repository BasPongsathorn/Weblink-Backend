/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "WeblinkCategories" (
    "WeblinkCategoryID" UUID NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Public" BOOLEAN NOT NULL DEFAULT false,
    "CreatedBy" UUID NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeblinkCategories_pkey" PRIMARY KEY ("WeblinkCategoryID")
);

-- CreateTable
CREATE TABLE "Weblink" (
    "WeblinkID" UUID NOT NULL,
    "Title" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "WeblinkCategoryID" UUID NOT NULL,
    "Public" BOOLEAN NOT NULL DEFAULT false,
    "CreatedBy" UUID NOT NULL,
    "UpdatedBy" UUID,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weblink_pkey" PRIMARY KEY ("WeblinkID")
);

-- CreateTable
CREATE TABLE "Anouncement" (
    "AnnouncementID" UUID NOT NULL,
    "Title" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Tag" TEXT NOT NULL,
    "OwnerID" UUID NOT NULL,
    "Public" BOOLEAN NOT NULL DEFAULT false,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "UpdateBy" UUID NOT NULL,
    "Viewer" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Anouncement_pkey" PRIMARY KEY ("AnnouncementID")
);

-- AddForeignKey
ALTER TABLE "Weblink" ADD CONSTRAINT "Weblink_WeblinkCategoryID_fkey" FOREIGN KEY ("WeblinkCategoryID") REFERENCES "WeblinkCategories"("WeblinkCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;
