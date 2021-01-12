import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { IsLoggedGuard } from '../shared/guards/isLogged.guard';
import { IRequest } from '../shared/interfaces/request';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Game } from './game.model';

@Controller('game')
export class GameController {
  constructor(private userService: UserService) {}

  @Get('/join')
  @UseGuards(IsLoggedGuard)
  public async join(@Req() req: IRequest) {
    const room = Game.findOne({
      where: { userID: req.user.id! } as any,
      include: [User as any],
    });
    console.log(room);
    return room;
  }

  @Post('/join')
  @UseGuards(IsLoggedGuard)
  public async joinRoom(@Req() req: IRequest, @Body() room: { room: string }) {
    const API_KEY = 'k6ZIUsMJjyNjjCyjjTRrw';
    console.log(req.user);
    const user = await this.userService.get(req.user.id!);

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
}
