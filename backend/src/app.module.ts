import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Do not convert to default import
import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
// import { RecipeModule } from './recipe/recipe.module';
import { DietaryRestrictionModule } from './dietary-restriction/dietary-restriction.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CuisineModule } from './cuisine/cuisine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid(
          'development',
          'production',
          'test',
          'provision',
        ),
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
        MAIL_USER: Joi.string().email().required(),
        MAIL_PASS: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().port().default(587),
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
          limit: 10, // Maximum number of requests per minute per IP
        },
      ],
    }),
    AuthModule,
    UserModule,
    MailerModule,
    // RecipeModule,
    DietaryRestrictionModule,
    RestaurantModule,
    CuisineModule,
  ],
})
export class AppModule {}
