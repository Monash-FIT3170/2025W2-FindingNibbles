import { Test, TestingModule } from '@nestjs/testing';
import { DietaryRequirementService } from './dietary-requirement.service';
import { DatabaseService } from '../database/database.service';

describe('DietaryRequirementService', () => {
  let service: DietaryRequirementService;

  const mockDatabaseService = {
    dietaryRequirement: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DietaryRequirementService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<DietaryRequirementService>(DietaryRequirementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
