import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { DbService } from './db/db.service';
import { GameModule } from './game/game.module';

@Module({
  imports: [UserModule, FileModule, GameModule],
  controllers: [AppController, FileController],
  providers: [DbService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
