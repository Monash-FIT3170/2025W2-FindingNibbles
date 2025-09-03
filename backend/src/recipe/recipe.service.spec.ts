import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { DatabaseService } from '../database/database.service';
import { ConfigService } from '@nestjs/config';

describe('RecipeService', () => {
  let service: RecipeService;

  const mockDatabaseService = {
    userDietary: {
      findMany: jest.fn(),
    },
    userAppliance: {
      findMany: jest.fn(),
    },
    cuisine: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    recipe: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
