-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "highscore" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "fastGrower" BOOLEAN NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 30,
    "height" INTEGER NOT NULL DEFAULT 30,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
