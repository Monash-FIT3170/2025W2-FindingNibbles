import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Do not convert to default import
import * as Joi from 'joi';

import { ApplianceModule } from './appliance/appliance.module';
import { AuthModule } from './auth/auth.module';
import { CuisineModule } from './cuisine/cuisine.module';
import { DietaryRequirementModule } from './dietary-requirement/dietary-requirement.module';
import { DirectionsModule } from './directions/directions.module';
import { MailerModule } from './mailer/mailer.module';
import { PrivacyModule } from './privacy/privacy.module';
import { RecipeModule } from './recipe/recipe.module';
import { RestaurantMenuModule } from './restaurant-menu/restaurant-menu.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production'),
        PORT: Joi.number().port().default(3000),
        DATABASE_URL: Joi.string().required(),
        AUTH_SECRET: Joi.string().required(),
        REFRESH_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
        GOOGLE_CLIENT_ID_ANDROID: Joi.string().required(),
        GOOGLE_CLIENT_ID_IOS: Joi.string().required(),
        GOOGLE_GEMINI_API_MODEL: Joi.string().required(),
        GOOGLE_GEMINI_API_KEY: Joi.string().required(),
        GOOGLE_MAIL_USER: Joi.string().email().required(),
        GOOGLE_MAIL_PASS: Joi.string().required(),
        LOCATIONIQ_API_KEY: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // Time to live in seconds
          limit: 30, // Maximum number of requests per minute per IP
        },
      ],
    }),
    AuthModule,
    UserModule,
    MailerModule,
    RecipeModule,
    DietaryRequirementModule,
    RestaurantModule,
    CuisineModule,
    ApplianceModule,
    RestaurantMenuModule,
    DirectionsModule,
    PrivacyModule,
  ],
})
export class AppModule {}
