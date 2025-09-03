import { Test, TestingModule } from '@nestjs/testing';
import { CuisineController } from './cuisine.controller';
import { CuisineService } from './cuisine.service';

describe('CuisineController', () => {
  let controller: CuisineController;

  const mockCuisineService = {
    findAll: jest.fn(),
    findOneById: jest.fn(),
    findRestaurantsByCuisine: jest.fn(),
    findPopularCuisines: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuisineController],
      providers: [
        {
          provide: CuisineService,
          useValue: mockCuisineService,
        },
      ],
    }).compile();

    controller = module.get<CuisineController>(CuisineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
