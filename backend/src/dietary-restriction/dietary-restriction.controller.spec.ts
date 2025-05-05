import { Test, TestingModule } from '@nestjs/testing';
import { DietaryRestrictionController } from './dietary-restriction.controller';
import { DietaryRestrictionService } from './dietary-restriction.service';

describe('DietaryRestrictionController', () => {
  let controller: DietaryRestrictionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietaryRestrictionController],
      providers: [DietaryRestrictionService],
    }).compile();

    controller = module.get<DietaryRestrictionController>(DietaryRestrictionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
