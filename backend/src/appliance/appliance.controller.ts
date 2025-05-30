import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApplianceService } from './appliance.service';
import { CreateApplianceDto } from './dto/create-appliance.dto';

@Controller('appliance')
export class ApplianceController {
  constructor(private readonly applianceService: ApplianceService) {}
  @Post()
  create(@Body() createApplianceDto: CreateApplianceDto) {
    return this.applianceService.create(createApplianceDto);
  }

  @Get()
  findAll() {
    return this.applianceService.findAll();
  }
}
