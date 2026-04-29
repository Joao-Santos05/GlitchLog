-- AlterTable
ALTER TABLE "library_entries" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "background_url" TEXT,
ADD COLUMN     "wishlist_is_public" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "wishlist_entries" (
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "id_igdb" INTEGER NOT NULL,

    CONSTRAINT "wishlist_entries_pkey" PRIMARY KEY ("user_id","id_igdb")
);

-- AddForeignKey
ALTER TABLE "wishlist_entries" ADD CONSTRAINT "wishlist_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_entries" ADD CONSTRAINT "wishlist_entries_id_igdb_fkey" FOREIGN KEY ("id_igdb") REFERENCES "games"("id_igdb") ON DELETE CASCADE ON UPDATE CASCADE;
