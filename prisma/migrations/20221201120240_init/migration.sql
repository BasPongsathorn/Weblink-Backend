-- CreateEnum
CREATE TYPE "LoginType" AS ENUM ('Email', 'AD');

-- CreateTable
CREATE TABLE "WeblinkCategories" (
    "WeblinkCategoryID" UUID NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Public" BOOLEAN NOT NULL DEFAULT false,
    "CreatedBy" UUID,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeblinkCategories_pkey" PRIMARY KEY ("WeblinkCategoryID")
);

-- CreateTable
CREATE TABLE "Weblink" (
    "WeblinkID" UUID NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Image" TEXT,
    "URL" TEXT NOT NULL,
    "WeblinkCategoryID" UUID NOT NULL,
    "Public" BOOLEAN NOT NULL DEFAULT false,
    "CreatedBy" UUID,
    "UpdatedBy" UUID,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weblink_pkey" PRIMARY KEY ("WeblinkID")
);

-- CreateTable
CREATE TABLE "CategoryAnnouncement" (
    "CategoryID" UUID NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "CreatedBy" UUID,
    "UpdatedBy" UUID,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryAnnouncement_pkey" PRIMARY KEY ("CategoryID")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "AnnouncementID" UUID NOT NULL,
    "Title" TEXT NOT NULL,
    "Image" TEXT,
    "CategoryID" UUID NOT NULL,
    "Description" TEXT NOT NULL,
    "Tag" TEXT,
    "OwnerID" UUID,
    "Public" BOOLEAN NOT NULL DEFAULT false,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "CreatedBy" TEXT NOT NULL,
    "UpdateBy" TEXT,
    "StartDate" TIMESTAMP(3),
    "EndDate" TIMESTAMP(3),
    "Viewer" INTEGER NOT NULL DEFAULT 0,
    "Hightlight" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("AnnouncementID")
);

-- CreateTable
CREATE TABLE "Faq" (
    "ID" UUID NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "CreatedBy" UUID,
    "UpdateBy" UUID,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "FaqUser" (
    "ID" UUID NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Message" TEXT NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "CreatedBy" UUID,
    "UpdateBy" UUID,

    CONSTRAINT "FaqUser_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Domain" (
    "ID" UUID NOT NULL,
    "DomainName" TEXT NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,
    "CreatedBy" UUID,
    "UpdateBy" UUID,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "LoginEmail" (
    "ID" UUID NOT NULL,
    "Email" TEXT NOT NULL,
    "DomainID" UUID NOT NULL,
    "Otp" VARCHAR(20),
    "OtpExpired" TIMESTAMP(3),
    "Role" BOOLEAN NOT NULL DEFAULT false,
    "Remove" BOOLEAN NOT NULL DEFAULT false,
    "Consent" BOOLEAN NOT NULL DEFAULT false,
    "CreatedBy" UUID,
    "UpdatedBy" UUID,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginEmail_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Token" (
    "ID" SERIAL NOT NULL,
    "Token" TEXT,
    "LoginType" "LoginType" NOT NULL,
    "Expiretion" TIMESTAMP(3) NOT NULL,
    "IP" VARCHAR(30),
    "Device" VARCHAR(100),
    "Latitude" VARCHAR(100),
    "Longtitue" VARCHAR(100),
    "LoginEmailID" UUID,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Viewer" (
    "ID" UUID NOT NULL,
    "AnnouncementID" UUID NOT NULL,
    "Email" TEXT,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Viewer_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginEmail_Email_key" ON "LoginEmail"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_Token_key" ON "Token"("Token");

-- AddForeignKey
ALTER TABLE "Weblink" ADD CONSTRAINT "Weblink_WeblinkCategoryID_fkey" FOREIGN KEY ("WeblinkCategoryID") REFERENCES "WeblinkCategories"("WeblinkCategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "CategoryAnnouncement"("CategoryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginEmail" ADD CONSTRAINT "LoginEmail_DomainID_fkey" FOREIGN KEY ("DomainID") REFERENCES "Domain"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_LoginEmailID_fkey" FOREIGN KEY ("LoginEmailID") REFERENCES "LoginEmail"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
