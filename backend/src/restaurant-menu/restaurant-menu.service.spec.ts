import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantMenuService } from './restaurant-menu.service';
import { DatabaseService } from '../database/database.service';
import { GeminiService } from '../gemini/gemini.service';

describe('RestaurantMenuService', () => {
  let service: RestaurantMenuService;

  const mockDatabaseService = {
    restaurant: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockGeminiService = {
    generateContent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantMenuService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: GeminiService,
          useValue: mockGeminiService,
        },
      ],
    }).compile();

    service = module.get<RestaurantMenuService>(RestaurantMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
