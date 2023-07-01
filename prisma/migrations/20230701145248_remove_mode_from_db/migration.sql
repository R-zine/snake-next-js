/*
  Warnings:

  - You are about to drop the column `dark` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "highscore" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "fastGrower" BOOLEAN NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 30,
    "height" INTEGER NOT NULL DEFAULT 30
);
INSERT INTO "new_User" ("fastGrower", "height", "highscore", "id", "speed", "title", "width") SELECT "fastGrower", "height", "highscore", "id", "speed", "title", "width" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
