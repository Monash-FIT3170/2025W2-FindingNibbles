import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantMenuService } from './restaurant-menu.service';

describe('RestaurantMenuService', () => {
  let service: RestaurantMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantMenuService],
    }).compile();

    service = module.get<RestaurantMenuService>(RestaurantMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
