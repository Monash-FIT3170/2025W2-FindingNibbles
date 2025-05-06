import { Test, TestingModule } from '@nestjs/testing';
import { CuisineController } from './cuisine.controller';
import { CuisineService } from './cuisine.service';

describe('CuisineController', () => {
  let controller: CuisineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuisineController],
      providers: [CuisineService],
    }).compile();

    controller = module.get<CuisineController>(CuisineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
