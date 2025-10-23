import { Module } from '@nestjs/common';
import { PrivacyController } from './privacy.controller';

@Module({
  controllers: [PrivacyController],
})
export class PrivacyModule {}
