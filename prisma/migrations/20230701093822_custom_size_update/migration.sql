-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "highscore" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "fastGrower" BOOLEAN NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 30,
    "height" INTEGER NOT NULL DEFAULT 30,
    "dark" BOOLEAN NOT NULL
);
INSERT INTO "new_User" ("dark", "fastGrower", "highscore", "id", "speed", "title") SELECT "dark", "fastGrower", "highscore", "id", "speed", "title" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
