-- CreateTable
CREATE TABLE "Viewer" (
    "ID" UUID NOT NULL,
    "AnnouncementID" UUID NOT NULL,
    "Email" TEXT,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Viewer_pkey" PRIMARY KEY ("ID")
);
