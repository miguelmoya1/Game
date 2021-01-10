import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('Game', () => {
  let service: GameService;
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
      controllers: [GameController],
    }).compile();

    service = module.get<GameService>(GameService);
    controller = module.get<GameController>(GameController);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
