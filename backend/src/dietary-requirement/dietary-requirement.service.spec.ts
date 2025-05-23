import { Test, TestingModule } from '@nestjs/testing';
import { DietaryRequirementService } from './dietary-requirement.service';

describe('DietaryRequirementService', () => {
  let service: DietaryRequirementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietaryRequirementService],
    }).compile();

    service = module.get<DietaryRequirementService>(DietaryRequirementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
