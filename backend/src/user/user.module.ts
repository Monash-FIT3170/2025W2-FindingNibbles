import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { DietaryRestrictionModule } from 'src/dietary-restriction/dietary-restriction.module';

@Module({
  imports: [DatabaseModule, DietaryRestrictionModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
