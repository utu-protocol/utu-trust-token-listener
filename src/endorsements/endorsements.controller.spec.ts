import { Test, TestingModule } from '@nestjs/testing';
import { EndorsementsController } from './endorsements.controller';
import { EndorsementsService } from './endorsements.service';

describe('EndorsementsController', () => {
  let controller: EndorsementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndorsementsController],
      providers: [EndorsementsService],
    }).compile();

    controller = module.get<EndorsementsController>(EndorsementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
