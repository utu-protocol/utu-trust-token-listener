import { Test, TestingModule } from '@nestjs/testing';
import { EndorsementsService } from './endorsements.service';

describe('EndorsementsService', () => {
  let service: EndorsementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndorsementsService],
    }).compile();

    service = module.get<EndorsementsService>(EndorsementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
