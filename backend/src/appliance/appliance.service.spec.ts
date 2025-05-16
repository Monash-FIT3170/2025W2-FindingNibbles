import { Test, TestingModule } from '@nestjs/testing';
import { ApplianceService } from './appliance.service';

describe('ApplianceService', () => {
  let service: ApplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplianceService],
    }).compile();

    service = module.get<ApplianceService>(ApplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
