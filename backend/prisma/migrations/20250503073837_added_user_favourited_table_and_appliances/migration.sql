-- CreateTable
CREATE TABLE "UserFavouritedRestaurant" (
    "userId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "UserFavouritedRestaurant_pkey" PRIMARY KEY ("userId","restaurantId")
);

-- CreateTable
CREATE TABLE "Appliances" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appliances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAppliance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "applianceId" INTEGER NOT NULL,

    CONSTRAINT "UserAppliance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAppliance_userId_applianceId_key" ON "UserAppliance"("userId", "applianceId");

-- AddForeignKey
ALTER TABLE "UserFavouritedRestaurant" ADD CONSTRAINT "UserFavouritedRestaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavouritedRestaurant" ADD CONSTRAINT "UserFavouritedRestaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppliance" ADD CONSTRAINT "UserAppliance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAppliance" ADD CONSTRAINT "UserAppliance_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
