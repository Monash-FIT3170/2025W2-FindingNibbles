import { Test, TestingModule } from '@nestjs/testing';
import { GooglePlacesApiService } from './google-places-api.service';

describe('GooglePlacesApiService', () => {
  let service: GooglePlacesApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GooglePlacesApiService],
    }).compile();

    service = module.get<GooglePlacesApiService>(GooglePlacesApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
