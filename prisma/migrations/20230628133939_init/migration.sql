-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "studentName" TEXT,
    "coachId" TEXT NOT NULL,
    "coachName" TEXT NOT NULL,
    "isBooked" BOOLEAN,
    "notes" JSONB,
    "satisfactionScore" INTEGER,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);
