-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "fees" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "placements" TEXT NOT NULL,
    "courses" TEXT[],
    "reviews" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");
