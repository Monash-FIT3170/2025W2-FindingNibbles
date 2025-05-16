import { Controller } from '@nestjs/common';
import { ApplianceService } from './appliance.service';
@Controller('appliances')
export class ApplianceController {
  constructor(private readonly applianceService: ApplianceService) {}
}
