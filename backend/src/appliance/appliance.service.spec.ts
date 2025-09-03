import { Test, TestingModule } from '@nestjs/testing';
import { ApplianceService } from './appliance.service';
import { DatabaseService } from '../database/database.service';

describe('ApplianceService', () => {
  let service: ApplianceService;

  const mockDatabaseService = {
    appliance: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplianceService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<ApplianceService>(ApplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
