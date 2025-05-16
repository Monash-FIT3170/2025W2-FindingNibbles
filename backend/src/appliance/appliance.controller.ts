import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApplianceService } from './appliance.service';
import { CreateApplianceDto } from './dto/create-appliance.dto';

@Controller('appliances')
export class ApplianceController {
  constructor(private readonly applianceService: ApplianceService) {}
  @Post()
  create(@Body() creatApplianceDto: CreateApplianceDto) {
    return this.applianceService.create(creatApplianceDto);
  }

  @Get()
  findAll() {
    return this.applianceService.findAll();
  }
}
