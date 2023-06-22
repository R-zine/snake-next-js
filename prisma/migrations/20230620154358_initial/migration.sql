-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "highscore" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "fastGrower" BOOLEAN NOT NULL,
    "dark" BOOLEAN NOT NULL
);
