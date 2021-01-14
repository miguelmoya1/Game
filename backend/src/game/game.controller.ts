import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
  @Get('/players/:id')
  public async getPlayersForGame(@Param('id') id: string) {
    const game = await Game.findOne({ where: { password: id } });
    const users = game?.getUsers();
    console.log(users);
  }

  @Post()
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

    if (!game) {
      throw new HttpException('Room not found!', HttpStatus.NOT_FOUND);
    }
    return game;
  }

  @Post('/join')
  @UseGuards(IsLoggedGuard)
  public async joinRoom(@Req() req: IRequest, @Body() room: { room: string }) {
    const API_KEY = 'k6ZIUsMJjyNjjCyjjTRrw';
    console.log(req.user);
    const user = req.user;

    // Check if this is a valid user
    const userID = user.id;

    const resources = [
      {
        object: 'room',
        room: room.room,
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
      return response.data;
    } catch (e) {
      console.error(e);
    }
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
}
