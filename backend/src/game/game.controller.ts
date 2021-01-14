import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import axios from 'axios';
import { IGame } from '../../../global';
import { IsLoggedGuard } from '../shared/guards/isLogged.guard';
import { IRequest } from '../shared/interfaces/request';
import { Game } from './game.model';

@Controller('game')
@UseGuards(IsLoggedGuard)
export class GameController {
  @Post('/')
  public async createGame(@Req() req: IRequest, @Body() body: IGame) {
    let game: Game;

    if (!body.password) {
      game = await Game.create({
        ...body,
        password: this.getRandomString().toLocaleUpperCase(),
      });
      await game.setUser(req.user.id);
    } else {
      game = (await Game.findOne({ where: { password: body.password } }))!;
    }
    console.log(game);
    if (!game) {
      throw new HttpException('Room not found!', HttpStatus.NOT_FOUND);
    }
    return this.joinRoom(game, req.user.id!);
  }

  private getRandomString(length = 6) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  private async joinRoom(game: Game, userID: string) {
    const API_KEY = 'k6ZIUsMJjyNjjCyjjTRrw';
    const resources = [
      {
        room: game.password,
        object: 'room',
        permission: 'join',
      },
    ];

    try {
      const response = await axios.post(
        'https://super.roomservice.dev/provision',
        JSON.stringify({
          user: userID,
          resources: resources,
        }),
        {
          headers: {
            Authorization: `Bearer: ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return { ...response.data, password: game.password };
    } catch (e) {
      console.error(e);
    }
  }
}
