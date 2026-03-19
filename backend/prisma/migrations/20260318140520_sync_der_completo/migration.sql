/*
  Warnings:

  - The primary key for the `user_follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_follow` on the `user_follows` table. All the data in the column will be lost.
  - You are about to drop the column `id_seguido` on the `user_follows` table. All the data in the column will be lost.
  - You are about to drop the column `id_seguidor` on the `user_follows` table. All the data in the column will be lost.
  - Added the required column `follower_id` to the `user_follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `user_follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_follows" DROP CONSTRAINT "user_follows_id_seguido_fkey";

-- DropForeignKey
ALTER TABLE "user_follows" DROP CONSTRAINT "user_follows_id_seguidor_fkey";

-- AlterTable
ALTER TABLE "user_follows" DROP CONSTRAINT "user_follows_pkey",
DROP COLUMN "data_follow",
DROP COLUMN "id_seguido",
DROP COLUMN "id_seguidor",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "follower_id" INTEGER NOT NULL,
ADD COLUMN     "following_id" INTEGER NOT NULL,
ADD CONSTRAINT "user_follows_pkey" PRIMARY KEY ("follower_id", "following_id");

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "review_id" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "review_likes" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "review_id" INTEGER NOT NULL,

    CONSTRAINT "review_likes_pkey" PRIMARY KEY ("user_id","review_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "notification_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "favorite_games" (
    "slot" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "id_igdb" INTEGER NOT NULL,

    CONSTRAINT "favorite_games_pkey" PRIMARY KEY ("user_id","slot")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("review_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_likes" ADD CONSTRAINT "review_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_likes" ADD CONSTRAINT "review_likes_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("review_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_games" ADD CONSTRAINT "favorite_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_games" ADD CONSTRAINT "favorite_games_id_igdb_fkey" FOREIGN KEY ("id_igdb") REFERENCES "games"("id_igdb") ON DELETE CASCADE ON UPDATE CASCADE;
