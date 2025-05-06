import { Test, TestingModule } from '@nestjs/testing';
import { CuisineService } from './cuisine.service';

describe('CuisineService', () => {
  let service: CuisineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuisineService],
    }).compile();

    service = module.get<CuisineService>(CuisineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
