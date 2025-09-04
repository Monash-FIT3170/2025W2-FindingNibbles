import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantMenuService } from './restaurant-menu.service';
import { DatabaseService } from '../database/database.service';
import { GeminiService } from '../gemini/gemini.service';
import { GetRandomDishErrorResponseDto, GetRandomDishSuccessResponseDto } from './dto/random-dish.dto';

describe('RestaurantMenuService - Random Dish', () => {
  let service: RestaurantMenuService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    dietaryRequirement: {
      findMany: jest.fn(),
    },
    dish: {
      findMany: jest.fn(),
    },
  };

  const mockGeminiService = {};

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
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('getRandomDishByDietaryRequirements', () => {
    it('should return error when no valid dietary requirements found', async () => {
      mockDatabaseService.dietaryRequirement.findMany.mockResolvedValue([]);

      const result = await service.getRandomDishByDietaryRequirements(['INVALID']);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('INVALID_DIETARY_REQUIREMENTS');
        expect(result.message).toContain('None of the provided dietary requirements are valid');
      }
    });

    it('should return error when no dishes match requirements', async () => {
      mockDatabaseService.dietaryRequirement.findMany.mockResolvedValue([
        { id: 1, name: 'VEGETARIAN' },
      ]);
      mockDatabaseService.dish.findMany.mockResolvedValue([]);

      const result = await service.getRandomDishByDietaryRequirements(['VEGETARIAN']);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('NO_MATCHING_DISHES');
        expect(result.message).toContain('No dishes found that satisfy all dietary requirements');
      }
    });

    it('should return a random dish when matches are found', async () => {
      const mockDish = {
        id: 1,
        name: 'Veggie Burger',
        description: 'Delicious vegetarian burger',
        price: 12.99,
        category: 'Mains',
        restaurant: {
          id: 1,
          name: 'Test Restaurant',
        },
        dishDietaries: [
          {
            dietary: { name: 'VEGETARIAN' },
          },
        ],
      };

      mockDatabaseService.dietaryRequirement.findMany.mockResolvedValue([
        { id: 1, name: 'VEGETARIAN' },
      ]);
      mockDatabaseService.dish.findMany.mockResolvedValue([mockDish]);

      const result = await service.getRandomDishByDietaryRequirements(['VEGETARIAN']);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.dish.name).toBe('Veggie Burger');
        expect(result.dish.restaurantName).toBe('Test Restaurant');
        expect(result.dish.dietaryTags).toContain('VEGETARIAN');
      }
    });
  });
});
