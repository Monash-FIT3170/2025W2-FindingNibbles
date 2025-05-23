import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { DietaryRequirementModule } from 'src/dietary-requirement/dietary-requirement.module';

@Module({
  imports: [DatabaseModule, DietaryRequirementModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
