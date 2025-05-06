import { PartialType } from '@nestjs/mapped-types';
import { CreateDietaryRestrictionDto } from './create-dietary-restriction.dto';

export class UpdateDietaryRestrictionDto extends PartialType(
  CreateDietaryRestrictionDto,
) {}
