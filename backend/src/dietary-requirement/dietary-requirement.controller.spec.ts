import { Test, TestingModule } from '@nestjs/testing';
import { DietaryRequirementController } from './dietary-requirement.controller';
import { DietaryRequirementService } from './dietary-requirement.service';

describe('DietaryRequirementController', () => {
  let controller: DietaryRequirementController;

  const mockDietaryRequirementService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietaryRequirementController],
      providers: [
        {
          provide: DietaryRequirementService,
          useValue: mockDietaryRequirementService,
        },
      ],
    }).compile();

    controller = module.get<DietaryRequirementController>(
      DietaryRequirementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
