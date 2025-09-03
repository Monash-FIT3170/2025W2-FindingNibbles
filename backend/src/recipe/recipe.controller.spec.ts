import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

describe('RecipeController', () => {
  let controller: RecipeController;

  const mockRecipeService = {
    generate: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    createFromDto: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        {
          provide: RecipeService,
          useValue: mockRecipeService,
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
