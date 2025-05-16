import { Test, TestingModule } from '@nestjs/testing';
import { ApplianceController } from './appliance.controller';
import { ApplianceService } from './appliance.service';

describe('ApplianceController', () => {
  let controller: ApplianceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplianceController],
      providers: [ApplianceService],
    }).compile();

    controller = module.get<ApplianceController>(ApplianceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
