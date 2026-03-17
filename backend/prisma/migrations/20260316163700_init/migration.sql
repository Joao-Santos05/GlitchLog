-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "games" (
    "id_igdb" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id_igdb")
);

-- CreateTable
CREATE TABLE "lists" (
    "list_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("list_id")
);

-- CreateTable
CREATE TABLE "library_entries" (
    "status" TEXT NOT NULL DEFAULT 'Quero Jogar',
    "marco_campanha" BOOLEAN NOT NULL DEFAULT false,
    "marco_secundarias" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "id_igdb" INTEGER NOT NULL,

    CONSTRAINT "library_entries_pkey" PRIMARY KEY ("user_id","id_igdb")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "nota" INTEGER NOT NULL,
    "review_text" TEXT,
    "user_id" INTEGER NOT NULL,
    "id_igdb" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "list_items" (
    "ordem" INTEGER NOT NULL,
    "list_id" INTEGER NOT NULL,
    "id_igdb" INTEGER NOT NULL,

    CONSTRAINT "list_items_pkey" PRIMARY KEY ("list_id","id_igdb")
);

-- CreateTable
CREATE TABLE "user_follows" (
    "data_follow" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_seguidor" INTEGER NOT NULL,
    "id_seguido" INTEGER NOT NULL,

    CONSTRAINT "user_follows_pkey" PRIMARY KEY ("id_seguidor","id_seguido")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_id_id_igdb_key" ON "reviews"("user_id", "id_igdb");

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_entries" ADD CONSTRAINT "library_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_entries" ADD CONSTRAINT "library_entries_id_igdb_fkey" FOREIGN KEY ("id_igdb") REFERENCES "games"("id_igdb") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_id_igdb_fkey" FOREIGN KEY ("id_igdb") REFERENCES "games"("id_igdb") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "lists"("list_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_id_igdb_fkey" FOREIGN KEY ("id_igdb") REFERENCES "games"("id_igdb") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_id_seguidor_fkey" FOREIGN KEY ("id_seguidor") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_id_seguido_fkey" FOREIGN KEY ("id_seguido") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
