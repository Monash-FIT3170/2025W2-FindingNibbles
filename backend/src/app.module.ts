import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Do not convert to default import
import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

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
        GOOGLE_CLIENT_ID: Joi.string().default(''),
        GOOGLE_CLIENT_SECRET: Joi.string().default(''),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
