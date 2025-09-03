import { Test, TestingModule } from '@nestjs/testing';
import { ApplianceController } from './appliance.controller';
import { ApplianceService } from './appliance.service';

describe('ApplianceController', () => {
  let controller: ApplianceController;

  const mockApplianceService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplianceController],
      providers: [
        {
          provide: ApplianceService,
          useValue: mockApplianceService,
        },
      ],
    }).compile();

    controller = module.get<ApplianceController>(ApplianceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
