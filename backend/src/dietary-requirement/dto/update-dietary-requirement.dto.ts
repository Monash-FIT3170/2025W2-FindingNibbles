import { PartialType } from '@nestjs/mapped-types';
import { CreateDietaryRequirementDto } from './create-dietary-requirement.dto';

export class UpdateDietaryRequirementDto extends PartialType(
  CreateDietaryRequirementDto,
) {}
