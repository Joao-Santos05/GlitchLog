-- AlterTable
ALTER TABLE "games" ADD COLUMN     "background_url" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "cover_url" TEXT,
ADD COLUMN     "developer" TEXT,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "platforms" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "rating_count" INTEGER,
ADD COLUMN     "release_year" INTEGER,
ADD COLUMN     "similar_games_json" TEXT;
