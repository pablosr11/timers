-- CreateTable
CREATE TABLE "Timer" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Timer_username_idx" ON "Timer"("username");
