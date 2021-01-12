import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  providers: [GameService, UserService],
})
export class GameModule {}
