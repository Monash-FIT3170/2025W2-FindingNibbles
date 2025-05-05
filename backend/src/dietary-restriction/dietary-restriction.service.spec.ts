import { Test, TestingModule } from '@nestjs/testing';
import { DietaryRestrictionService } from './dietary-restriction.service';

describe('DietaryRestrictionService', () => {
  let service: DietaryRestrictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietaryRestrictionService],
    }).compile();

    service = module.get<DietaryRestrictionService>(DietaryRestrictionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
