import { Test, TestingModule } from '@nestjs/testing';
import { DietaryRequirementController } from './dietary-requirement.controller';
import { DietaryRequirementService } from './dietary-requirement.service';

describe('DietaryRequirementController', () => {
  let controller: DietaryRequirementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietaryRequirementController],
      providers: [DietaryRequirementService],
    }).compile();

    controller = module.get<DietaryRequirementController>(
      DietaryRequirementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
