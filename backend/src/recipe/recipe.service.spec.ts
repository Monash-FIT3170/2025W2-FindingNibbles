import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database/database.service';
import { GeminiService } from '../gemini/gemini.service';
import { RecipeService } from './recipe.service';

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

  const mockGeminiService = {
    generateImage: jest
      .fn()
      .mockResolvedValue('data:image/png;base64,mockImageData'),
    generateContent: jest.fn(),
    extractResponseContent: jest.fn(),
    parseJsonResponse: jest.fn(),
    generateAndParseJson: jest.fn(),
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
        {
          provide: GeminiService,
          useValue: mockGeminiService,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
