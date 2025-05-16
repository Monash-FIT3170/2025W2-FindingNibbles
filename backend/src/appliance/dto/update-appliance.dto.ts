import { PartialType } from '@nestjs/mapped-types';
import { CreateApplianceDto } from './create-appliance.dto';

export class UpdateDietaryRestrictionDto extends PartialType(
  CreateApplianceDto,
) {}
