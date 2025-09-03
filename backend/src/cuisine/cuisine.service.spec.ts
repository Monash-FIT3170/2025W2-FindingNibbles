import { Test, TestingModule } from '@nestjs/testing';
import { CuisineService } from './cuisine.service';
import { DatabaseService } from '../database/database.service';

describe('CuisineService', () => {
  let service: CuisineService;

  const mockDatabaseService = {
    cuisine: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CuisineService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<CuisineService>(CuisineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
