/*
Warnings:

- The primary key for the `MealPlanDish` table will be changed. If it partially fails, the table could be left without primary key constraint.
- The primary key for the `RestaurantCuisine` table will be changed. If it partially fails, the table could be left without primary key constraint.
- The primary key for the `UserDietary` table will be changed. If it partially fails, the table could be left without primary key constraint.
- The primary key for the `UserFavouritedRestaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
- You are about to drop the `Appliances` table. If the table is not empty, all the data it contains will be lost.
- A unique constraint covering the columns `[dishId,dietaryId]` on the table `DishDietary` will be added. If there are existing duplicate values, this will fail.
- A unique constraint covering the columns `[userId,dietaryId]` on the table `UserDietary` will be added. If there are existing duplicate values, this will fail.
- A unique constraint covering the columns `[userId,restaurantId]` on the table `UserFavouritedRestaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserAppliance" DROP CONSTRAINT "UserAppliance_applianceId_fkey";

-- AlterTable
ALTER TABLE "MealPlanDish" DROP CONSTRAINT "MealPlanDish_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MealPlanDish_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RestaurantCuisine" DROP CONSTRAINT "RestaurantCuisine_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RestaurantCuisine_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserDietary" DROP CONSTRAINT "UserDietary_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserDietary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserFavouritedRestaurant" DROP CONSTRAINT "UserFavouritedRestaurant_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserFavouritedRestaurant_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Appliances";

-- CreateTable
CREATE TABLE "UserCuisine" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cuisineId" INTEGER NOT NULL,

    CONSTRAINT "UserCuisine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appliance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeUserAppliance" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "userApplianceId" INTEGER NOT NULL,
    "applianceId" INTEGER,

    CONSTRAINT "RecipeUserAppliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeUserDietary" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "userDietaryId" INTEGER NOT NULL,

    CONSTRAINT "RecipeUserDietary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "estimatedTimeMinutes" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "dietaryTags" TEXT[],
    "nutritionalInfo" TEXT[],
    "difficultyLevel" TEXT NOT NULL,
    "imageURL" TEXT,
    "cuisineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCuisine_userId_cuisineId_key" ON "UserCuisine"("userId", "cuisineId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeUserAppliance_recipeId_userApplianceId_key" ON "RecipeUserAppliance"("recipeId", "userApplianceId");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeUserDietary_recipeId_userDietaryId_key" ON "RecipeUserDietary"("recipeId", "userDietaryId");

-- CreateIndex
CREATE UNIQUE INDEX "DishDietary_dishId_dietaryId_key" ON "DishDietary"("dishId", "dietaryId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDietary_userId_dietaryId_key" ON "UserDietary"("userId", "dietaryId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavouritedRestaurant_userId_restaurantId_key" ON "UserFavouritedRestaurant"("userId", "restaurantId");

-- AddForeignKey
ALTER TABLE "UserCuisine" ADD CONSTRAINT "UserCuisine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCuisine" ADD CONSTRAINT "UserCuisine_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppliance" ADD CONSTRAINT "UserAppliance_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUserAppliance" ADD CONSTRAINT "RecipeUserAppliance_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUserAppliance" ADD CONSTRAINT "RecipeUserAppliance_userApplianceId_fkey" FOREIGN KEY ("userApplianceId") REFERENCES "UserAppliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUserAppliance" ADD CONSTRAINT "RecipeUserAppliance_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUserDietary" ADD CONSTRAINT "RecipeUserDietary_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeUserDietary" ADD CONSTRAINT "RecipeUserDietary_userDietaryId_fkey" FOREIGN KEY ("userDietaryId") REFERENCES "UserDietary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_cuisineId_fkey" FOREIGN KEY ("cuisineId") REFERENCES "Cuisine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
