-- AlterTable
ALTER TABLE "library_entries" ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "started_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "bio" TEXT;
