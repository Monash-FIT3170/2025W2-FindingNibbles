-- CreateTable
CREATE TABLE "UserCuisine" (
    "userId" INTEGER NOT NULL,
    "cuisineId" INTEGER NOT NULL,

    CONSTRAINT "UserCuisine_pkey" PRIMARY KEY ("userId","cuisineId")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" JSONB NOT NULL,
    "missing_ingredients" TEXT[],
    "estimated_time_minutes" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "dietary_tags" TEXT[],
    "Difficulty_level" INTEGER NOT NULL,
    "image_url" TEXT,
    "Nutritional_info" TEXT[],
    "cuisineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCuisine" ADD CONSTRAINT "UserCuisine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisine" ADD CONSTRAINT "UserCuisine_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
